import { connectDB } from "../config/db";
import User, { IUser } from "../models/user";
import { ErrorResponse } from "../utils/errorResponse";
import ICSWrapper from "../utils/ics_s-e-wrapper";
import { crawlDB } from "../utils/db_crawler";
import { IDBStruct,IDateTime } from "../models/deutschebahnInterfaces";
import DeutscheBahnRoutes, { IDeutscheBahnRoutes } from "../models/deutschebahn";
import objHash from "object-hash";

function convertToDate(dateTime: IDateTime): Date {
	return new Date(dateTime.date + " " + dateTime.hour + ":" + dateTime.minutes + ":" + dateTime.seconds);
}

export async function UpdateDeutscheBahnRoutes() {
	try {
		await connectDB();
		const all_users: IUser[] | null = await User.find({ "configTrain.active": true });
		var error_users: IUser[] = [];

		for (let userCount = 0; userCount < all_users.length; userCount++) {
			const currentUser: IUser = all_users[userCount];
			if (currentUser.ics_uid) {
				// ~~~~~~~~~ Get start/end times ~~~~~~~~~ //
				const currentDate = new Date();
				const { firstDay, secondDay } = await ICSWrapper(currentUser.ics_uid);
				const dates: Date[] = [
					convertToDate(firstDay.startDateTime),
					convertToDate(firstDay.endDateTime),
					convertToDate(secondDay.startDateTime),
					convertToDate(secondDay.endDateTime),
				];


				// ~~~~~~~~~~~~ Process Update ~~~~~~~~~~~ //
				var routeCount = currentUser.configTrain.maxRoutes.valueOf(); // Max Routes in Database stored
				const lenDBRouteIDs = currentUser.configTrain.dbrouteids.length;
				if (routeCount != lenDBRouteIDs && dates[0].getTime() && dates[1].getTime() && dates[2].getTime() && dates[3].getTime()) {
					currentUser.configTrain.dbrouteids = [];
				}

				for (let dateCount = 0; dateCount < dates.length; dateCount++) {
					if (routeCount != 0) {
						var deutschbahnID: String = "";
						if (lenDBRouteIDs > 0) {
							deutschbahnID = currentUser.configTrain.dbrouteids[dateCount];
						} else {
							deutschbahnID = null;
						}
						console.log(deutschbahnID);
						// ~~~~~ Process only necessary Dates ~~~~ //
						if (dates[dateCount] > currentDate) {
							routeCount--;

							// ~~~ Process only the right direction ~~ //
							const whichDirection = dateCount % 2; // 0: Home to Work; 1: Work to Home
							var fromID: Number, toID: Number, arrival:Date, departure:Date;
							if (whichDirection == 0) {
								fromID = currentUser.configTrain.homeTrainStationID;
								toID = currentUser.configTrain.workTrainStationID;
								arrival = new Date(dates[dateCount].getTime() - currentUser.configTrain.timeOffset.valueOf());
								departure = null;
							} else {
								toID = currentUser.configTrain.homeTrainStationID;
								fromID = currentUser.configTrain.workTrainStationID;
								arrival = null;
								departure = new Date(dates[dateCount].getTime() + currentUser.configTrain.timeOffset.valueOf());
							}

							// --------- Main --------- //
							const uniqueRouteID = makeUnqiueRouteID(currentUser.ics_uid, fromID, toID, dates[dateCount].getDate()); // Create unique RouteID
							if (!deutschbahnID) {
								await createIfNotExistsDeutscheBahnRoute(currentUser, uniqueRouteID, fromID, toID, arrival, departure);
							} else {
								const deutscheBahnRoutesToUpdate: IDeutscheBahnRoutes = await DeutscheBahnRoutes.findOne({ _id: deutschbahnID });
								if (deutscheBahnRoutesToUpdate.routeId == uniqueRouteID && !deutscheBahnRoutesToUpdate.wasUpated) {
									const structDB: IDBStruct = await crawlDB(fromID, toID, arrival, departure); // Get Train routes
									const newRoutesHash = objHash(structDB.routes);
									if (newRoutesHash != deutscheBahnRoutesToUpdate.routesHash) { // Check if Route has Changed
										deutscheBahnRoutesToUpdate.routes = structDB.routes;
									}
									deutscheBahnRoutesToUpdate.wasUpated = true;
									await deutscheBahnRoutesToUpdate.save();
								} else {
									await createIfNotExistsDeutscheBahnRoute(currentUser, uniqueRouteID, fromID, toID, arrival, departure);
								}
							}
						}
					} else {
						break;
					}
				} // Dates
			} else {
				currentUser.configTrain.active = false;
				await currentUser.save();
				error_users.push(all_users[userCount]);
			}
		} // Users
		await clearUnusedDeutscheBahnRoutes();
	} catch (error: any) {
		console.error(error);
	}
}

async function clearUnusedDeutscheBahnRoutes() {
	await DeutscheBahnRoutes.deleteMany({ wasUpated: false }); // Clear not Updated Routes

	const deutscheBahnRoutesToChange: IDeutscheBahnRoutes[] = await DeutscheBahnRoutes.find({ wasUpated: true }); 
	for (let x = 0; x < deutscheBahnRoutesToChange.length; x++) {
		deutscheBahnRoutesToChange[x].wasUpated = false;	
		deutscheBahnRoutesToChange[x].save();
		console.log(deutscheBahnRoutesToChange[x].id);
	}
	console.log("Finished!")
}

function makeUnqiueRouteID(icsUID: Number, fromID: Number, toID: Number, day: Number): String {
	const outIcsUID = icsUID.toString().replace(" ", "-");
	const outFromID = fromID.toString().replace(" ", "-");
	const outToID = toID.toString().replace(" ", "-");
	const outDay = day.toString().replace(" ", "-");
	return `${outIcsUID}|${outFromID}->${outToID}|${outDay}`;
}

async function createIfNotExistsDeutscheBahnRoute(user: IUser, uniqueRouteID:String, fromID: Number, toID: Number, arrival:Date, departure:Date, index:number= null) {
	const searchExistingRoute: IDeutscheBahnRoutes = await DeutscheBahnRoutes.findOne({ routeId: uniqueRouteID }); // Search for duplicate
	if (searchExistingRoute) {
		if (index) {
			user.configTrain.dbrouteids[index] = searchExistingRoute.id; // Change to the right RouteID
		}
		else {
			user.configTrain.dbrouteids.push(searchExistingRoute.id); // Set only the right RouteID
		}
	} else {
		const structDB: IDBStruct = await crawlDB(fromID, toID, arrival, departure); // Get Train routes
		const deutscheBahnRoutes: IDeutscheBahnRoutes = await DeutscheBahnRoutes.create({
			routeId: uniqueRouteID,
			fromID: fromID,
			from: structDB.from,
			fromLocation: structDB.fromLocation,
			toID: toID,
			to: structDB.to,
			toLocation: structDB.toLocation,
			routes: structDB.routes,
			wasUpated: true,
		}); // Create new Database entry
		
		if (index) {
			user.configTrain.dbrouteids[index] = deutscheBahnRoutes.id; // Change to new Entry Id
		}
		else {
			user.configTrain.dbrouteids.push(deutscheBahnRoutes.id); // Add new Entry Id to user
		}
	}
	await user.save();
}

UpdateDeutscheBahnRoutes();
