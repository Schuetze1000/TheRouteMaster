import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { verifyToken } from "../middleware/auth";
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
			return next(new ErrorResponse("Please provide a valid oldpassword and newpassword", 400));
		}
		// This need to be done because passoword isn't selected automatically
		const user_id = await verifyToken(req, res, false);
		const user: IUser | null = await User.findOne({ _id:user_id }).select("+password");

		const isMatch: boolean = await user.matchPassword(oldpassword);
		if (!isMatch) {
			return next(new ErrorResponse("Invalid Credentials", 401));
		}

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
	try {
		const user: IUser | null = await verifyToken(req, res);
		const usermail = user.email;
		await user.deleteOne();
		res.status(200).json({
			success: true,
			data: `Deleted User:${usermail}`,
		}).end();
	} catch (error) {
		if (error instanceof ErrorResponse) {
			return next(new ErrorResponse(error.message, error.statusCode));
		}
		return next(new ErrorResponse(error.message, 400));
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

