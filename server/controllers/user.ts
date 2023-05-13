import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { verifyToken } from "../middleware/auth";
import { ProfileStructure, UserStructure } from "../models/api";
import { getICSfromUser } from '../middleware/ics';

exports.updateProfile = async (req: Request, res: Response, next: any) => {
	const profile: ProfileStructure  = req.body;
	try {
		const user: IUser | null = await verifyToken(req, res);
		user.profile.firstname = profile.firstname;
		user.profile.surname = profile.surname;
		user.profile.avatar = profile.avatar;
		user.profile.homeaddress.number = profile.homeaddress.number;
		user.profile.homeaddress.street = profile.homeaddress.street;
		user.profile.homeaddress.zip = profile.homeaddress.zip;
		user.profile.homeaddress.city = profile.homeaddress.city;
		user.profile.homeaddress.state = profile.homeaddress.state;
		user.profile.homeaddress.country = profile.homeaddress.country;
		await user.save();
		res.status(200).send("UPDATED").end();
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
		const userstructure: UserStructure = user.mapToUserStructure();
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
		res.status(200).send(`Deactivated User:${user.email}`).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.deleteAccount = async (req: Request, res: Response, next: any) => {
	try {
		const user: IUser | null = await verifyToken(req, res);
		const usermail = user.email;
		await user.deleteOne();
		res.status(200).send(`Deleted User:${usermail}`).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

