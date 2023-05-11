import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import ICS, { IICS_Data } from "../models/ics";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getICS = async (req: Request, res: Response, next: any) => {
	const jwt_token = req.cookies.token;

	try {
		if (!jwt_token) {
			return next(new ErrorResponse("Please provide a valid Token", 400));
		}

		jwt.verify(jwt_token, process.env.JWT_SECRET!);

        const {id} =  jwt.decode(jwt_token, { json: true });

		const user: IUser | null = await User.findById(id);
		if (!user) {
			return next(new ErrorResponse("Invalid Credentials", 401));
		}

		const uid = parseInt(user.ics_uid);
		if (!uid) {
			return next(new ErrorResponse("No ics_uid specified", 401));
		}

		const ics: IICS_Data | null = await ICS.findOne({ uid });

		res.status(200).send(JSON.stringify({ data: ics.data, hash: ics.hash }));
		res.end();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return next(new ErrorResponse(error.message, 401));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getHash = async (req: Request, res: Response, next: any) => {};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //
