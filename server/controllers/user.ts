import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { verifyToken, verifyAndMatch } from "../middleware/auth";
import { ProfileStructure, UserStructure, ConfigTrainStructure } from "../models/api";
const dbProfile = require("hafas-client/p/db/index.js");
const createClient = require("hafas-client");

exports.updateProfile = async (req: Request, res: Response, next: any) => {
	const profile: ProfileStructure  = req.body.profile;
	const {ics_uid} = req.body;
	try {
		const user: IUser | null = await verifyToken(req, res);
		user.updateProfile(profile);
		user.ics_uid = ics_uid;
		user.save();
		res.status(200).json({
			success: true,
			data: "Profile and ICS_UID updated successful!",
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 418));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.updateConfigTrain = async (req: Request, res: Response, next: any) => {
	const configTrain: ConfigTrainStructure  = req.body;
	try {
		if (configTrain.maxRoutes > 3) {
			return next(new ErrorResponse("Please provide a valid config", 400));
		}

		const user: IUser | null = await verifyToken(req, res);
		const client = createClient(dbProfile, "https://the-routemaster.schuetz-andreas.dev/")
		const options = {
			duration:  0,
			results: 0,
			subStops: false,
			entrances: false, 
			linesOfStops: false, 
			remarks: false, 
		}
		
		try {
			await client.departures(configTrain.homeTrainStationID.toString(), options);
			await client.departures(configTrain.workTrainStationID.toString(), options);
		} catch (error) {
			return next(new ErrorResponse("Please provide a valid config", 400));
		}
		
		user.updateConfigTrain(configTrain);
		user.save();
		res.status(200).json({
			success: true,
			data: "Train config updated successful!",
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 418));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.updatePassword = async (req: Request, res: Response, next: any) => {
	const { oldpassword, newpassword } = req.body;
	try {
		if (!oldpassword || !newpassword) {
			return next(new ErrorResponse("Please provide a valid Request", 400));
		}
		const user: IUser | null = await verifyAndMatch(req, res, oldpassword, false)
		user.password = newpassword;
		user.save();
		res.status(201).json({
			success: true,
			data: "Password change successful",
		}).end();

	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getUser = async (req: Request, res: Response, next: any) => {
	try {
		const user: IUser | null = await verifyToken(req, res);
		const userstructure: UserStructure = user.mapUserStructure();
		res.status(200).json(userstructure).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.deactivateAccount = async (req: Request, res: Response, next: any) => {
	try {
		const user: IUser | null = await verifyToken(req, res);
		user.active = false;
		await user.save();
		res.status(200).json({
			success: true,
			data: `Deactivated User:${user.email}`,
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.deleteAccount = async (req: Request, res: Response, next: any) => {
	const { password, email } = req.body;
	try {
		if (!password || !email) {
			return next(new ErrorResponse("Please provide a valid Request", 400));
		}
		const user: IUser | null = await verifyAndMatch(req, res, password, true);
		await user.deleteOne();
		res.status(200).json({
			success: true,
			data: "Account deleted!",
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.updateEmail = async (req: Request, res: Response, next: any) => {
	const { password, newEmail } = req.body;
	try {
		if (!password || !newEmail) {
			return next(new ErrorResponse("Please provide a valid Credentials", 400));
		}
		const user: IUser | null = await verifyAndMatch(req, res, password, true);
		user.email = newEmail;
		user.save();
		res.status(201).json({
			success: true,
			data: "Email change successful",
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.updateUsername = async (req: Request, res: Response, next: any) => {
	const { password, newUsername } = req.body;
	try {
		if (!password || !newUsername) {
			return next(new ErrorResponse("Please provide a valid Credentials", 400));
		}
		const user: IUser | null = await verifyAndMatch(req, res, password, true);
		user.username = newUsername;
		user.save();
		res.status(201).json({
			success: true,
			data: "Username change successful",
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //