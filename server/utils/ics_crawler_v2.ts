import * as cheerio from "cheerio";
import axios from "axios";
import * as cliProgress from "cli-progress";
import ICS, { IICS_Data } from "../models/ics";
import * as colors from "ansi-colors";

function createBar(max_count:number, name: string, color = colors.white){
	const bar = new cliProgress.SingleBar(
		{
			format: name + "|" + color("{bar}") + "| {percentage}% || {value}/{total} Files || Speed: {eta}/s",
			barCompleteChar: "\u2588",
			barIncompleteChar: "\u2591",
			hideCursor: true,
		},
		cliProgress.Presets.shades_classic);
	bar.start(max_count, 0);

	return bar;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function getUIDS(): Promise<[string[], string[]]> {
	try {
		const name_list: string[] = [];
		const uid_list: string[] = [];

		const response = await axios.get("https://vorlesungsplan.dhbw-mannheim.de/ical.php");

		const data_html = cheerio.load(response.data);
		const elements = data_html('select[name="Kurse"] option');

		for (let y = 1; y < elements.length; y++) {
			const str_exists = name_list.indexOf(elements.get(y).attributes[0].value);
			if (str_exists == -1){
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
	const bar1 = createBar(name_list.length, "Downloading ICS Files	  ", colors.yellow);

	// Download all requied ics files
	for (let x = 0; x < name_list.length; x++) {
		const response2 = await axios.get(`http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=${uid_list[x]}`);
		ics_list.push(response2.data);
		bar1.increment();
	}

	bar1.stop();
	return ics_list;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function UpdateICS() {
	var name_list: string[] = [];
	var uid_list: string[] = [];

	try {
		[name_list, uid_list] = await getUIDS();

		// Get all Documents their uid and active value
		const ics_data: IICS_Data[] | null = await ICS.find({},{"uid" : 1, "active" : 1, "_id" : 0});

		// Create progressbar
		const bar1 = createBar(ics_data.length, "Search for ICS to Update  ", colors.red);
		
		// Remove all name and uid with active = false
		for (let x = 0; x < ics_data.length; x++) {
			if (ics_data[x].active == false) {
				const index_remove = uid_list.indexOf(ics_data[x].uid.toString())
				name_list.splice(index_remove, 1);
				uid_list.splice(index_remove, 1);
			}
			bar1.increment();
		}
		
		bar1.stop();

		// ------------------------- Processing Update ------------------------- //
		if (name_list.length != 0) {

			// Download all requied ics files
			const ics_list: string[] = await getICS_Data(name_list, uid_list);

			// Create progressbar
			const bar2 =  createBar(name_list.length, "Update ICS Data           ", colors.green);


			// ------------- Create new Document or Update if it exists ------------ //
			for (let x = 0; x < name_list.length; x++) {
				bar2.increment();
				const name = name_list[x];
				const uid = parseInt(uid_list[x]);
				const data = ics_list[x];

				const ics: IICS_Data | null = await ICS.findOne({ uid });

				if (!ics) {
					await ICS.create({
						uid,
						name,
						data,
					});
				} else {
					ics.UpdateIcsData(data);
				}
			}
			bar2.stop()
		}
	} catch (error: any) {
		console.error(error);
	}
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

