import { Response, Request } from "express";
import { ErrorResponse, onError } from "../utils/errorResponse";
import ICS, { IICS_Data } from "../models/ics";
import User, { IUser } from "../models/user";
import { verifyToken } from "../middleware/auth";
import { getICSfromUser } from "../middleware/ics";
import ICS_Data from "../models/ics";

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getICS = async (req: Request, res: Response, next: any) => {
	try {
		// Get user specified ics informations
		const user: IUser | null = await verifyToken(req, res);
		const ics: IICS_Data | null = await getICSfromUser(user);
		res.status(200).send(JSON.stringify({ name: ics.name, data: ics.data, hash: ics.hash }));
		res.end();
	} catch (error) {
		onError(error, next);
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getHash = async (req: Request, res: Response, next: any) => {
	try {
		// Get user specified ics hash value
		const user: IUser | null = await verifyToken(req, res);
		const ics: IICS_Data | null = await getICSfromUser(user);
		res.status(200).send(JSON.stringify({ hash: ics.hash }));
		res.end();
	} catch (error) {
		onError(error, next);
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getAvailableICS = async (req: Request, res: Response, next: any) => {
	try {
		await verifyToken(req,res, false);
		const data:IICS_Data[] = await ICS_Data.find({}).select("name uid -_id");
		res.status(200).json(data).end();
	} catch (error) {
		onError(error, next);
	}
};
