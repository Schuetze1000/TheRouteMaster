import User, { IUser } from "../models/user";
import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import jwt from "jsonwebtoken";

export const sendToken = (user: IUser, status: number, res: Response) => {
	const jwtExpirySeconds = parseInt(process.env.JWT_EXPIRE_SEC);
	const token = user.getSignedToken();
	res.status(status).cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
};

export const verifyToken = async (req: Request, res: Response, getUser = true) => {
	const jwt_token = req.cookies.token;
	try {
		if (!jwt_token) {
			throw new ErrorResponse("Please provide a valid Token", 400);
		}

		jwt.verify(jwt_token, process.env.JWT_SECRET!);
		const { id, exp } = jwt.decode(jwt_token, { json: true });
		const user: IUser | undefined = await User.findById(id);

		if (!user || !user.active) {
			throw new ErrorResponse("Please provide a valid Token", 400);
		}

		let current_timestamp = Math.round(Date.now()/1000);

		if (exp - 300 < current_timestamp) {
			sendToken(user, 200, res);
		}

		if (getUser) {
			if (!user) {
				throw new ErrorResponse("Invalid Credentials", 401);
			} else {
				return user;
			}
		}

		return undefined;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			throw new ErrorResponse(error.message, 401);
		}
		throw new ErrorResponse(error.message, 400);
	}
};
