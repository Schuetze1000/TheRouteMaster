import * as cheerio from "cheerio";
import axios from "axios";
import { createBar } from "./progressbar";

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function getUIDS(): Promise<[string[], string[]]> {
	try {
		const name_list: string[] = [];
		const uid_list: string[] = [];

		// Fetch dhbw-ical-download-website  
		const response = await axios.get("https://vorlesungsplan.dhbw-mannheim.de/ical.php");

		// Read all available courses
		const data_html = cheerio.load(response.data);
		const elements = data_html('select[name="Kurse"] option');

		for (let y = 1; y < elements.length; y++) {
			const str_exists = name_list.indexOf(elements.get(y).attributes[0].value);
			if (str_exists == -1) {
				name_list.push(elements.get(y).attributes[0].value);
				uid_list.push(elements.get(y).attributes[1].value);
			}
		}
		return [name_list, uid_list];
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function getICS_Data(name_list: string[] = [], uid_list: string[] = []): Promise<string[]> {
	const ics_list: string[] = [];

	// Create progressbar
	const bar1 = await createBar(name_list.length, "Downloading ICS Files", "Files");

	// Fetsch all requied ics files
	for (let x = 0; x < name_list.length; x++) {
		const response2 = await axios.get(`http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=${uid_list[x]}`);
		ics_list.push(response2.data);
		bar1.increment();
	}

	bar1.stop();
	return ics_list;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //
