import User, { IUser } from "../models/user";
import { Response, Request } from "express";

export const sendToken = (user: IUser, status:number , res: Response) => {
	const jwtExpirySeconds = parseInt(process.env.JWT_EXPIRE_SEC);
	const token = user.getSignedToken();
	res.status(status).cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
	res.end();
};
