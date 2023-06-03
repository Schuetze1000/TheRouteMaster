import DeutscheBahnRoutes, { IDeutscheBahnRoutes } from "../models/deutschebahn";
import { connectDB } from "../config/db";
import { IDBRoutes, ISwitch, ITrain, IFoot } from "models/deutschebahnInterfaces";
import ICS, { IICS_Data } from "../models/ics";

const createClient = require("hafas-client");
const dbProfile = require("hafas-client/p/db/index.js");

const ical2json = require("ical2json");

// create a client with the Deutsche Bahn profile
const client = createClient(dbProfile, "https://the-routemaster.schuetz-andreas.dev/");

function parseICALTime(time: string): IDateTime {
	const output = new Date(
		time[0] +
			time[1] +
			time[2] +
			time[3] +
			"-" +
			time[4] +
			time[5] +
			"-" +
			time[6] +
			time[7] +
			" " +
			time[9] +
			time[10] +
			":" +
			time[11] +
			time[12] +
			":" +
			time[13] +
			time[14]
	);

	return {
		date: output.getFullYear().toString() + "-" + output.getMonth().toString().padStart(2, "0") + "-" + output.getDate().toString().padStart(2, "0"),
		hour: output.getHours(),
		minutes: output.getMinutes(),
		seconds: output.getSeconds(),
	};
}

function compareTime(DayStart: IDateTime, DayEnd: IDateTime, eventStart: IDateTime, eventEnd: IDateTime) {
	if (DayStart.hour > eventStart.hour) {
		DayStart.date = eventStart.date;
		DayStart.hour = eventStart.hour;
		DayStart.minutes = eventStart.minutes;
		DayStart.seconds = eventStart.seconds;
	} else if (DayStart.hour === eventStart.hour && DayStart.minutes > eventStart.minutes) {
		DayStart.date = eventStart.date;
		DayStart.hour = eventStart.hour;
		DayStart.minutes = eventStart.minutes;
		DayStart.seconds = eventStart.seconds;
	} 
	if (DayEnd.hour < eventEnd.hour) {
		DayEnd.date = eventEnd.date;
		DayEnd.hour = eventEnd.hour;
		DayEnd.minutes = eventEnd.minutes;
		DayEnd.seconds = eventEnd.seconds;
	} else if (DayEnd.hour === eventEnd.hour && DayEnd.minutes < eventEnd.minutes) {
		DayEnd.date = eventEnd.date;
		DayEnd.hour = eventEnd.hour;
		DayEnd.minutes = eventEnd.minutes;
		DayEnd.seconds = eventEnd.seconds;
	}
	return { DayStart, DayEnd };
}

interface IDateTime {
	date: String;
	hour: Number;
	minutes: Number;
	seconds: Number;
}

interface IEventDay {
	startDateTime: IDateTime,
	endDateTime: IDateTime,
}

interface IEvents {
	firstDay: IEventDay,
	secondDay: IEventDay,
}


async function test1() {
	await connectDB();
	const {firstDay, secondDay} = await ICSWrapper();
	console.log(firstDay);
	console.log(secondDay);
}

async function test2() {
	await connectDB();
	const {firstDay, secondDay} = await ICSWrapper();
	const firstDateStart = firstDay.startDateTime.date + " " + firstDay.startDateTime.hour + ":" + firstDay.startDateTime.minutes + ":" + firstDay.startDateTime.seconds;
	const res = await client.journeys("508709", "8000105", { results: 1, arrival: new Date(firstDateStart) });
	await dbStructor(res.journeys);
	//console.log(res.journeys);
}

//test2();
test2();

async function ICSWrapper():Promise<IEvents> {
	
	const ics: IICS_Data | null = await ICS.findOne({ uid: 8537001 });

	let out = ical2json.convert(ics.data).VCALENDAR[0].VEVENT;

	let currentDateTime = new Date();
	const currentDate =
		currentDateTime.getFullYear().toString() +
		"-" +
		currentDateTime.getMonth().toString().padStart(2, "0") +
		"-" +
		currentDateTime.getDate().toString().padStart(2, "0");
	currentDateTime.setTime(currentDateTime.getTime() + 86400000);
	const nextDate =
		currentDateTime.getFullYear().toString() +
		"-" +
		currentDateTime.getMonth().toString().padStart(2, "0") +
		"-" +
		currentDateTime.getDate().toString().padStart(2, "0");

	console.log(currentDate);
	console.log(nextDate);

	let firstDayEnd: IDateTime = {
		date: "",
		hour: -1,
		minutes: -1,
		seconds: -1,
	};

	let secondDayEnd: IDateTime = {
		date: "",
		hour: -1,
		minutes: -1,
		seconds: -1,
	};

	let firstDayStart: IDateTime = {
		date: "",
		hour: 100,
		minutes: 100,
		seconds: 100,
	};

	let secondDayStart: IDateTime = {
		date: "",
		hour: 100,
		minutes: 100,
		seconds: 100,
	};

	for (let x = 0; x < out.length; x++) {
		let eventStart = parseICALTime(out[x].DTSTART);
		let eventEnd = parseICALTime(out[x].DTEND);
		if (currentDate === eventStart.date) {
			let { DayStart, DayEnd } = compareTime(firstDayStart, firstDayEnd, eventStart, eventEnd);
			firstDayStart = DayStart;
			firstDayEnd = DayEnd;
		} else if (nextDate === eventStart.date) {
			let { DayStart: DayStart, DayEnd: DayEnd } = compareTime(secondDayStart, secondDayEnd, eventStart, eventEnd);
			secondDayStart = DayStart;
			secondDayEnd = DayEnd;
		}
	}

	const firstDay:IEventDay = {
		startDateTime: firstDayStart,
		endDateTime: firstDayEnd,
	}

	const secondDay:IEventDay = {
		startDateTime: secondDayStart,
		endDateTime: secondDayEnd,
	}

	return {firstDay, secondDay}
}

async function dbStructor(journeys: any) {
	const dbRoutes: IDBRoutes[] = [];
	for (let indexJourneys = 0; indexJourneys < journeys.length; indexJourneys++) {
		let routes: ISwitch[] = [];
		for (let indexLegs = 0; indexLegs < journeys[indexJourneys].legs.length; indexLegs++) {
			const leg = journeys[indexJourneys].legs[indexLegs];
			if (!leg.walking) {
				const tmp: ITrain = {
					name: leg.line.name,
					idNr: leg.line.id,
					types: `${leg.line.mode} || ${leg.line.product} || ${leg.line.productName}`,
					direction: leg.direction,
					from: leg.origin.name,
					fromLocation: {
						latitude: leg.origin.location.latitude,
						longitude: leg.origin.location.longitude,
					},
					to: leg.destination.name,
					toLocation: {
						latitude: leg.destination.location.latitude,
						longitude: leg.destination.location.longitude,
					},
					departure: leg.departure,
					plannedDeparture: leg.plannedDeparture,
					departureDelay: leg.departureDelay,
					plannedArrival: leg.plannedArrival,
					arrival: leg.arrival,
					arivalDelay: leg.arrivalDelay,
				};
				routes.push({
					index: indexLegs,
					walk: false,
					types: tmp,
				});
			} else {
				const wtime = new Date(leg.arrival).getTime() - new Date(leg.departure).getTime();
				const tmp: IFoot = {
					from: leg.origin.name,
					fromLocation: {
						latitude: leg.origin.location.latitude,
						longitude: leg.origin.location.longitude,
					},
					to: leg.destination.name,
					toLocation: {
						latitude: leg.destination.location.latitude,
						longitude: leg.destination.location.longitude,
					},
					distance: leg.distance,
					walkTime: wtime,
				};
				routes.push({
					index: indexLegs,
					walk: true,
					types: tmp,
				});
			}
		} // End route

		dbRoutes.push({
			arrival: routes[routes.length - 1].types.arrival,
			plannedArrival: routes[routes.length - 1].types.plannedArrival,
			arivalDelay: routes[routes.length - 1].types.arivalDelay,
			route: routes,
			price: {
				amount: journeys[indexJourneys].price?.amount,
				currency: journeys[indexJourneys].price?.currency,
			},
		});
	} // End journey

	const from = dbRoutes[0].route[0].types.from;
	const fromLocation = dbRoutes[0].route[0].types.fromLocation;
	const to = dbRoutes[0].route[dbRoutes[0].route.length - 1].types.to;
	const toLocation = dbRoutes[0].route[dbRoutes[0].route.length - 1].types.toLocation;
	const fromID = 508709;
	const toID = 8000105;

	const deutscheBahnRoutes: IDeutscheBahnRoutes = await DeutscheBahnRoutes.create({
		fromID: fromID,
		from: from,
		fromLocation: fromLocation,
		toID: toID,
		to: to,
		toLocation: toLocation,
		routes: dbRoutes,
	});
}
