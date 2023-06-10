import { IEvents, IEventDay, IDateTime } from "models/deutschebahnInterfaces";
import ICS, { IICS_Data } from "../models/ics";
const ical2json = require("ical2json");

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
		date:
			output.getFullYear().toString() +
			"-" +
			(output.getMonth() + 1).toString().padStart(2, "0") +
			"-" +
			output.getDate().toString().padStart(2, "0"),
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

async function ICSWrapper(icsUID: Number): Promise<IEvents> {
	const ics: IICS_Data | null = await ICS.findOne({ uid: icsUID });
	let out = ical2json.convert(ics.data).VCALENDAR[0].VEVENT;

	let currentDateTime = new Date();
	const currentDate =
		currentDateTime.getFullYear().toString() +
		"-" +
		(currentDateTime.getMonth() + 1).toString().padStart(2, "0") +
		"-" +
		currentDateTime.getDate().toString().padStart(2, "0");
	currentDateTime.setTime(currentDateTime.getTime() + 86400000 * 1.5); //! Only for Debugg @Schuetze1000
	const nextDate =
		currentDateTime.getFullYear().toString() +
		"-" +
		(currentDateTime.getMonth() + 1).toString().padStart(2, "0") +
		"-" +
		currentDateTime.getDate().toString().padStart(2, "0");

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
		const location: String = out[x].LOCATION;
		if (location) {
			let eventStart = parseICALTime(out[x].DTSTART);
			let eventEnd = parseICALTime(out[x].DTEND);

			if (currentDate == eventStart.date) {
				let { DayStart, DayEnd } = compareTime(firstDayStart, firstDayEnd, eventStart, eventEnd);
				firstDayStart = DayStart;
				firstDayEnd = DayEnd;
			} else if (nextDate == eventStart.date) {
				let { DayStart: DayStart, DayEnd: DayEnd } = compareTime(secondDayStart, secondDayEnd, eventStart, eventEnd);
				secondDayStart = DayStart;
				secondDayEnd = DayEnd;
			}
		}
	}

	const firstDay: IEventDay = {
		startDateTime: firstDayStart,
		endDateTime: firstDayEnd,
	};

	const secondDay: IEventDay = {
		startDateTime: secondDayStart,
		endDateTime: secondDayEnd,
	};

	return { firstDay, secondDay };
}

export default ICSWrapper;
