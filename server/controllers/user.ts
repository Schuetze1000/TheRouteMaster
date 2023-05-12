import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { verifyToken } from "../middleware/auth";
import { Profile } from "../models/api";


exports.updateProfile = async (req: Request, res: Response, next: any) => {
    const profile: Profile = req.body;
    
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
    res.status(200).send("UPDATED").end()
}