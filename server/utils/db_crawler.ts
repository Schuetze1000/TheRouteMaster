import DeutscheBahnRoutes, { IDeutscheBahnRoutes } from "../models/deutschebahn";
import { connectDB } from "../config/db";
import { IDBStruct, IDBRoutes, ISwitch, ITrain, IFoot } from "models/deutschebahnInterfaces";
import ICSWrapper from "./ics_s-e-wrapper";

const createClient = require("hafas-client");
const dbProfile = require("hafas-client/p/db/index.js");

export async function crawlDB(fromID:Number, toID:Number, arrival:Date = null, departure:Date = new Date(), results:Number = 1) {
	const client = createClient(dbProfile, "https://the-routemaster.schuetz-andreas.dev/");
	let res;
	if (arrival) {
		res = await client.journeys(String(fromID), String(toID), { results: results, arrival: arrival});
	}else {
		res = await client.journeys(String(fromID), String(toID), { results: results, departure: departure});
	}
	
	return await dbStructor(res.journeys);
}

async function dbStructor(journeys: any):Promise<IDBStruct> {
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

	const dbStruct:IDBStruct = {
		fromID: fromID,
		from: from,
		fromLocation: fromLocation,
		toID: toID,
		to: to,
		toLocation: toLocation,
		routes: dbRoutes,
	}

	return dbStruct;
}
