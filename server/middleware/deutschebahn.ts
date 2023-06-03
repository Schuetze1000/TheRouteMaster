import { connectDB } from "../config/db";
import User, { IUser } from "../models/user";
import { ErrorResponse } from "../utils/errorResponse";
import ICSWrapper from "../utils/ics_s-e-wrapper";
import { IDateTime } from '../models/deutschebahnInterfaces';

function convertToDate(dateTime:IDateTime):Date {
    return new Date(dateTime.date + " " + dateTime.hour + ":" + dateTime.minutes + ":" + dateTime.seconds)
}

export async function UpdateDeutscheBahnRoutes() {
	try {
		await connectDB();
		const all_users: IUser[] | null = await User.find({ "configTrain.active": true });
        var error_users: IUser[] = [];

		for (let x = 0; x < all_users.length; x++) {
            if (all_users[x].ics_uid) {
                
                const { firstDay, secondDay } = await ICSWrapper(all_users[x].ics_uid);
                
                const firstDateStart = convertToDate(firstDay.startDateTime);
                const firstDateEnd = convertToDate(firstDay.endDateTime);
                const secondDateStart = convertToDate(secondDay.startDateTime);
                const secondDateEnd = convertToDate(secondDay.endDateTime);  

                CompareAndDownloadDeutscheBahn(firstDateStart);
                CompareAndDownloadDeutscheBahn(firstDateEnd);
                CompareAndDownloadDeutscheBahn(secondDateStart);
                CompareAndDownloadDeutscheBahn(secondDateEnd);
            
            } else
            {
                all_users[x].configTrain.active = false;
                all_users[x].save();
                error_users.push(all_users[x]);
            }
		}

	} catch (error: any) {
		console.error(error);
	}
};

async function  CompareAndDownloadDeutscheBahn(compareDate:Date ) {
    const currentDate = new Date();
	try {
        if (compareDate > currentDate) {
            
        }
	} catch (error: any) {
		console.error(error);
	}
};

UpdateDeutscheBahnRoutes()