import User, { IUser } from "../models/user";
import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import ICS, { IICS_Data } from "../models/ics";

export const getICSfromUser = async (user: IUser) => {
		const uid = parseInt(user.ics_uid);
		if (!uid) {
			throw new ErrorResponse("No ics_uid specified", 401);
		}

		const ics: IICS_Data | null = await ICS.findOne({ uid });

		if (!ics) {
			user.ics_uid = ""
            throw new ErrorResponse("ICS not found", 418);
		}
        return ics;
}