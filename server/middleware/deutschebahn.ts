import { connectDB } from "../config/db";
import User, { IUser } from "../models/user";
import { ErrorResponse } from "../utils/errorResponse";
import ICSWrapper from "../utils/ics_s-e-wrapper";
import { crawlDB } from "../utils/db_crawler";
import { IDBStruct, IDateTime } from "../models/deutschebahnInterfaces";
import DeutscheBahnRoutes, { IDeutscheBahnRoutes } from "../models/deutschebahn";
import objHash from "object-hash";

function convertToDate(dateTime: IDateTime): Date {
	return new Date(dateTime.date + " " + dateTime.hour + ":" + dateTime.minutes + ":" + dateTime.seconds);
}

export async function UpdateDeutscheBahnRoutes() {
	try {
		await connectDB();
		const all_users: IUser[] | null = await User.find({ "configTrain.active": true });

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
				var routeCount = 0; // Max Routes in Database stored
				const constRouteCount = currentUser.configTrain.maxRoutes.valueOf();
				const lenDBRouteIDs = currentUser.configTrain.dbrouteids.length;
				if (
					constRouteCount != lenDBRouteIDs &&
					dates[0] > currentDate &&
					dates[1] > currentDate &&
					dates[2] > currentDate &&
					dates[3] > currentDate
				) {
					currentUser.configTrain.dbrouteids = [];
				}
				for (let dateCount = 0; dateCount < dates.length; dateCount++) {
					if (routeCount != constRouteCount) {
						var deutschbahnID: String = "";
						if (lenDBRouteIDs > 0) {
							deutschbahnID = currentUser.configTrain.dbrouteids[routeCount % constRouteCount];
						} else {
							deutschbahnID = null;
						}

						// ~~~~~ Process only necessary Dates ~~~~ //
						if (dates[dateCount] > currentDate) {
							// ~~~ Process only the right direction ~~ //
							const whichDirection = dateCount % 2; // 0: Home to Work; 1: Work to Home
							var fromID: Number, toID: Number, arrival: Date, departure: Date;
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
								if (!deutscheBahnRoutesToUpdate) {
									// Perform configTrain-reset on false dbrouteid
									currentUser.configTrain.dbrouteids = [];
									dateCount = 0;
								} else {
									if (deutscheBahnRoutesToUpdate.routeId == uniqueRouteID && !deutscheBahnRoutesToUpdate.wasUpated) {
										const structDB: IDBStruct = await crawlDB(fromID, toID, arrival, departure); // Get Train routes
										const newRoutesHash = objHash(structDB.routes);
										if (newRoutesHash != deutscheBahnRoutesToUpdate.routesHash) {
											// Check if Route has Changed
											deutscheBahnRoutesToUpdate.routes = structDB.routes;
										}
										deutscheBahnRoutesToUpdate.wasUpated = true;
										await deutscheBahnRoutesToUpdate.save();
									} else {
										await createIfNotExistsDeutscheBahnRoute(
											currentUser,
											uniqueRouteID,
											fromID,
											toID,
											arrival,
											departure,
											routeCount % constRouteCount
										);
									} // routeId && wasUpated
								} // deutscheBahnRoutesToUpdate
							} // deutschbahnID
							routeCount += 1;
						} // dates[dateCount] > currentDate
					} else {
						break;
					} // routeCount != constRouteCount
				} // Dates
			} else {
				currentUser.configTrain.active = false;
				currentUser.configTrain.dbrouteids = [];
			} // ics_uid undefiend
			await currentUser.save();
		} // Users
		await clearUnusedDeutscheBahnRoutes();
	} catch (error) {
		console.error("[ERROR] UpdateDeutscheBahnRoutes:", error);
	}
}

async function clearUnusedDeutscheBahnRoutes() {
	try {
		await DeutscheBahnRoutes.deleteMany({ wasUpated: false }); // Clear not Updated Routes

		const deutscheBahnRoutesToChange: IDeutscheBahnRoutes[] = await DeutscheBahnRoutes.find({ wasUpated: true });
		for (let x = 0; x < deutscheBahnRoutesToChange.length; x++) {
			deutscheBahnRoutesToChange[x].wasUpated = false;
			deutscheBahnRoutesToChange[x].save();
		}
	} catch (error) {
		console.error("[ERROR] clearUnusedDeutscheBahnRoutes:", error);
	}
}

function makeUnqiueRouteID(icsUID: Number, fromID: Number, toID: Number, day: Number): String {
	const outIcsUID = icsUID.toString().replace(" ", "-");
	const outFromID = fromID.toString().replace(" ", "-");
	const outToID = toID.toString().replace(" ", "-");
	const outDay = day.toString().replace(" ", "-");
	return `${outIcsUID}|${outFromID}->${outToID}|${outDay}`;
}

async function createIfNotExistsDeutscheBahnRoute(
	user: IUser,
	uniqueRouteID: String,
	fromID: Number,
	toID: Number,
	arrival: Date,
	departure: Date,
	index: number = null
) {
	try {
		const searchExistingRoute: IDeutscheBahnRoutes = await DeutscheBahnRoutes.findOne({ routeId: uniqueRouteID }); // Search for duplicate
		if (searchExistingRoute) {
			if (index) {
				user.configTrain.dbrouteids[index] = searchExistingRoute.id; // Change to the right RouteID
			} else {
				user.configTrain.dbrouteids.push(searchExistingRoute.id); // Set only the right RouteID
			}
			if (searchExistingRoute.wasUpated == false) {
				const structDB: IDBStruct = await crawlDB(fromID, toID, arrival, departure); // Get Train routes
				const newRoutesHash = objHash(structDB.routes);
				if (newRoutesHash != searchExistingRoute.routesHash) {
					// Check if Route has Changed
					searchExistingRoute.routes = structDB.routes;
				}
				searchExistingRoute.wasUpated = true;
				await searchExistingRoute.save();
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
			} else {
				user.configTrain.dbrouteids.push(deutscheBahnRoutes.id); // Add new Entry Id to user
			}
		}
		await user.save();
	} catch (error) {
		console.error("[ERROR] createIfNotExistsDeutscheBahnRoute:", error);
	}
}