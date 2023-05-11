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

export async function getUIDS(): Promise<[string[], string[]]> {
	try {
		const name_list: string[] = [];
		const uid_list: string[] = [];

		const response = await axios.get("https://vorlesungsplan.dhbw-mannheim.de/ical.php");

		const data_html = cheerio.load(response.data);
		const elements = data_html('select[name="Kurse"] option');

		for (let y = 1; y < elements.length; y++) {
			name_list.push(elements.get(y).attributes[0].value);
			uid_list.push(elements.get(y).attributes[1].value);
		}
		return [name_list, uid_list];
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export async function getICS_Data(name_list: string[] = [], uid_list: string[] = []): Promise<string[]> {
	const ics_list: string[] = [];
	const bar1 = createBar(name_list.length, "Downloading ICS Files	  ", colors.yellow);

	for (let x = 0; x < name_list.length; x++) {
		const response2 = await axios.get(`http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=${uid_list[x]}`);
		ics_list.push(response2.data);
		bar1.increment();
	}
	bar1.stop();
	return ics_list;
}

export async function UpdateICS() {
	var name_list: string[] = [];
	var uid_list: string[] = [];
	var ics_list: string[] = [];
	

	try {
		[name_list, uid_list] = await getUIDS();
		const bar1 = createBar(uid_list.length, "Search for ICS to Update  ", colors.red);

		for (let x = 0; x < uid_list.length; x++) {
			const uid = parseInt(uid_list[x]);
			
			const ics: IICS_Data | null = await ICS.findOne({ "uid" : uid });

			if (ics && ics.active == false) {
				name_list.splice(x, 1);
				uid_list.splice(x, 1);
				x -= 1
			}
			bar1.increment();
		}
		
		bar1.stop();

		if (name_list.length != 0) {
			ics_list = await getICS_Data(name_list, uid_list);
			const bar2 =  createBar(name_list.length, "Update ICS Data           ", colors.green);

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
		}
	} catch (error: any) {
		console.error(error);
	}
}
