import User, { IUser } from "../models/user";
import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import jwt from "jsonwebtoken";

export const sendToken = (user: IUser, status: number, res: Response) => {
	const loginToken = user.getSignedLoginToken();
	const refreshToken = user.getSignedRefreshToken();
	res.status(status).send({"token":loginToken, "refreshToken":refreshToken});
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export const verifyToken = async (req: Request, res: Response, getUser = true, isRefreshToken = false) => {
	try {
		let checked_token:string;
		if (!isRefreshToken){
			const jwt_token  = (req.headers.authorization).replace("Bearer ","");
			if (!jwt_token) {
				throw new ErrorResponse("Please provide a valid Token", 400);
			}
			jwt.verify(jwt_token, process.env.JWT_AUTH_SECRET!);
			checked_token = jwt_token;
		}
		else {
		 	const { jwt_token } = req.body;
			if (!jwt_token) {
				throw new ErrorResponse("Please provide a valid Token", 400);
			}
			jwt.verify(jwt_token, process.env.JWT_REFRESH_SECRET!);
			checked_token = jwt_token;
		}
		
		const { id } = jwt.decode(checked_token, { json: true });
		const user: IUser | undefined = await User.findById(id);

		if (!user || !user.active) {
			throw new ErrorResponse("Please provide a valid Token", 400);
		}

		if (getUser) {
			if (!user) {
				throw new ErrorResponse("Invalid Credentials", 401);
			} else {
				return user;
			}
		}
		return id;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			throw new ErrorResponse(error.message, 401);
		}
		throw new ErrorResponse(error.message, 400);
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export const verifyAndMatch = async (req: Request, res: Response, password:string, securepw = true) => {
	try {
		const user_id = await verifyToken(req, res, false);
		const user: IUser | null = await User.findOne({ _id:user_id }).select("+password");
		const isMatch: boolean = await user.matchPassword(password);

		if (!isMatch) {
			throw new ErrorResponse("Invalid Credentials", 401);
		}
		
		if (securepw) {
			const outUser: IUser | null = await User.findOne({ _id:user_id });
			return outUser;
		}
		else {
			return user;
		}
	} catch (error) {
		if (error instanceof ErrorResponse) {
			throw new ErrorResponse(error.message, error.statusCode);
		}
		throw new ErrorResponse(error.message, 400);
	}

}