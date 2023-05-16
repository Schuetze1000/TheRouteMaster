import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { verifyToken, verifyAndMatch } from "../middleware/auth";
import { ProfileStructure, UserStructure } from "../models/api";

exports.updateProfile = async (req: Request, res: Response, next: any) => {
	const profile: ProfileStructure  = req.body;
	try {
		const user: IUser | null = await verifyToken(req, res);
		user.updateProfile(profile);
		user.save();
		res.status(200).json({
			success: true,
			data: "Profile updated successful",
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
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
	const { password, newemail } = req.body;
	try {
		if (!password || !newemail) {
			return next(new ErrorResponse("Please provide a valid Request", 400));
		}
		const userID = await verifyToken(req, res, false);
		
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
	const { newUsername } = req.body;
	try {
		const user: IUser | null = await verifyToken(req, res);
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