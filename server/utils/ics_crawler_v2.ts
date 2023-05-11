import * as cheerio from "cheerio";
import axios from "axios";
import * as cliProgress from "cli-progress";
import ICS, { IICS_Data } from "../models/ics";
import * as colors from "ansi-colors";
import User, { IUser } from "../models/user";

function createBar(max_count: number, name: string, color = colors.white, subname2 = "Files") {
	console.log(name + ":");
	const bar = new cliProgress.SingleBar(
		{
			format: color("{bar}") + "| {percentage}% || {value}/{total} " + subname2 + " || Speed: {eta}/s",
			barCompleteChar: "\u2588",
			barIncompleteChar: "\u2591",
			hideCursor: true,
		},
		cliProgress.Presets.shades_classic
	);
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
	const bar1 = createBar(name_list.length, "Downloading ICS Files", colors.yellow);

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
		const ics_data: IICS_Data[] | null = await ICS.find({}, { uid: 1, active: 1, _id: 0 });

		// Create progressbar
		const bar1 = createBar(ics_data.length, "Search for ICS to Update", colors.red);

		// Remove all name and uid with active = false
		for (let x = 0; x < ics_data.length; x++) {
			if (ics_data[x].active == false) {
				const index_remove = uid_list.indexOf(ics_data[x].uid.toString());
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
			const bar2 = createBar(name_list.length, "Update ICS Data", colors.green);

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
			bar2.stop();
		}
	} catch (error: any) {
		console.error(error);
	}
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function UpdateActiveICS() {
	const user: IUser[] | null = await User.find({}, { ics_uid: 1 });
	const active_uid_list: string[] = [];

	const bar1 = createBar(user.length, "Get all uid of all active ICS", colors.red, "Entries");

	for (let x = 0; x < user.length; x++) {
		const str_exists = active_uid_list.indexOf(user[x].ics_uid);
		if (str_exists == -1) {
			active_uid_list.push(user[x].ics_uid);
		}
		bar1.increment();
	}

	bar1.stop();

	const all_ics: IICS_Data[] | null = await User.find({ uid: true });
	const bar2 = createBar(all_ics.length, "Update de-active ICS", colors.green, "Entries");

	for (let x = 0; x < all_ics.length; x++) {
		const str_exists = active_uid_list.indexOf(all_ics[x].uid.toString());
		if (str_exists == -1) {
			all_ics[x].active = false;
			await all_ics[x].save();
		} else {
			active_uid_list.splice(x, 1);
		}
		bar2.increment();
	}

	bar2.stop();
	const bar3 = createBar(active_uid_list.length, "Update active ICS", colors.green, "Entries");

	for (let x = 0; x < active_uid_list.length; x++) {
		const ics: IICS_Data | null = await ICS.findOne({ uid: active_uid_list[x] });
		ics.active = true;
		await ics.save();
		bar3.increment();
	}
	bar3.stop();
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function ICSUpdateAll() {
	console.log(
		colors.red(
			"\n#####################################################################" +
			"\n################### Updating All ICS Configs/Data ###################" +
			"\n#####################################################################\n"
		)
	);
	await UpdateICS();
	await UpdateActiveICS();
}
