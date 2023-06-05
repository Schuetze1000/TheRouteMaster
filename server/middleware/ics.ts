import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import ICS, { IICS_Data } from "../models/ics";
import User, { IUser } from "../models/user";
import { createBar } from "../utils/progressbar";
import { getUIDS, getICS_Data } from "../utils/ics_crawler_v2";
import * as colors from "ansi-colors";

export async function getICSfromUser (user: IUser) {
	// ----------------- Get ICS-Model from specified user ----------------- //
	const uid = user.ics_uid;
	if (!uid) {
		throw new ErrorResponse("No ics_uid specified", 401);
	}

	const ics: IICS_Data | null = await ICS.findOne({ uid });

	if (!ics) {
		throw new ErrorResponse("ICS not found", 418);
	}
	return ics;
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function UpdateICS() {
	let name_list: string[] = [];
	let uid_list: string[] = [];

	try {
		[name_list, uid_list] = await getUIDS();

		// Get all Documents their uid and active value
		const ics_data: IICS_Data[] | null = await ICS.find({}, "uid active -_id");

		// Create progressbar
		const bar1 = await createBar(ics_data.length, "Search for ICS to Update", "Files");

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
			const bar2 = await createBar(name_list.length, "Update ICS Data", "Files");

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
	} catch (error) {
		console.error(error);
	}
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function UpdateActiveICS() {
	// ------------- Get all ics-uids from the user collection ------------- //
	const user: IUser[] | null = await User.find({}, { ics_uid: 1 });
	const active_uid_list: string[] = [];

	const bar1 = await createBar(user.length, "Get all uid of all active ICS", "Entries");

	for (let x = 0; x < user.length; x++) {
		if (user[x].ics_uid) {
			const str_exists = active_uid_list.indexOf(String(user[x].ics_uid));
			if (str_exists == -1) {
				active_uid_list.push(String(user[x].ics_uid));
			}
		}
		bar1.increment();
	}

	bar1.stop();

	// ---------------- Deactivate all now unused ICS-Files ---------------- //
	const all_ics: IICS_Data[] | null = await ICS.find({ active: true });
	const bar2 = await createBar(all_ics.length, "Update de-active ICS", "Entries");
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

	// ------------------ Activate all now used ICS-Files ------------------ //
	const bar3 = await createBar(active_uid_list.length, "Update active ICS", "Entries");

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
