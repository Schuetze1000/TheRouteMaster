import User, { IUser } from "../models/user";
import { ErrorResponse } from "../utils/errorResponse";
import ICSWrapper from "../utils/ics_s-e-wrapper";
import { crawlDB } from "../utils/db_crawler";
import { IDBStruct, IDateTime } from "../models/deutschebahnInterfaces";
import DeutscheBahnRoutes, {
  IDeutscheBahnRoutes,
} from "../models/deutschebahn";
import objHash from "object-hash";
import { createMultiBar, addBarToMulti, createBar } from "../utils/progressbar";
import * as colors from "ansi-colors";
import sendEmail from "../utils/emailSender";

function convertToDate(dateTime: IDateTime): Date {
  return new Date(
    dateTime.date +
      " " +
      dateTime.hour +
      ":" +
      dateTime.minutes +
      ":" +
      dateTime.seconds
  );
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function UpdateDeutscheBahnRoutes(withEMail: boolean = false) {
  try {
    console.log(
      colors.red(
        "\n#####################################################################" +
          "\n#################### Updating DeutscheBahnRoutes ####################" +
          "\n#####################################################################"
      )
    );
    const multibar = await createMultiBar(
      "Processing DeutscheBahnRoutes-Update"
    );
    const all_users: IUser[] | null = await User.find({
      "configTrain.active": true,
    });
    const bar1 = addBarToMulti(multibar, all_users.length, "Users");
    const bar2 = addBarToMulti(multibar, 4, "Dates");
    const bar3 = addBarToMulti(multibar, 0, "Routes");

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
        let routeCount = 0; // Max Routes in Database stored
        const constRouteCount = currentUser.configTrain.maxRoutes.valueOf();
        const lenDBRouteIDs = currentUser.configTrain.dbrouteids.length;
        bar3.setTotal(constRouteCount);
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
          bar3.update(routeCount);
          if (routeCount != constRouteCount) {
            let deutschbahnID: String = "";
            if (lenDBRouteIDs > 0) {
              deutschbahnID =
                currentUser.configTrain.dbrouteids[
                  routeCount % constRouteCount
                ];
            } else {
              deutschbahnID = null;
            }

            // ~~~~~ Process only necessary Dates ~~~~ //
            if (dates[dateCount] > currentDate) {
              // ~~~ Process only the right direction ~~ //
              const whichDirection = dateCount % 2; // 0: Home to Work; 1: Work to Home
              let fromID: Number, toID: Number, arrival: Date, departure: Date;
              if (whichDirection == 0) {
                fromID = currentUser.configTrain.homeTrainStationID;
                toID = currentUser.configTrain.workTrainStationID;
                arrival = new Date(
                  dates[dateCount].getTime() -
                    currentUser.configTrain.timeOffset.valueOf()
                );
                departure = null;
              } else {
                toID = currentUser.configTrain.homeTrainStationID;
                fromID = currentUser.configTrain.workTrainStationID;
                arrival = null;
                departure = new Date(
                  dates[dateCount].getTime() +
                    currentUser.configTrain.timeOffset.valueOf()
                );
              }

              // --------- Main --------- //
              const uniqueRouteID = makeUnqiueRouteID(
                currentUser.ics_uid,
                fromID,
                toID,
                dates[dateCount].getDate()
              ); // Create unique RouteID
              if (!deutschbahnID) {
                await createIfNotExistsDeutscheBahnRoute(
                  currentUser,
                  uniqueRouteID,
                  fromID,
                  toID,
                  arrival,
                  departure
                );
              } else {
                const deutscheBahnRoutesToUpdate: IDeutscheBahnRoutes =
                  await DeutscheBahnRoutes.findOne({ _id: deutschbahnID });
                if (!deutscheBahnRoutesToUpdate) {
                  // Perform configTrain-reset on false dbrouteid
                  currentUser.configTrain.dbrouteids = [];
                  dateCount = 0;
                } else {
                  if (
                    deutscheBahnRoutesToUpdate.routeId == uniqueRouteID &&
                    !deutscheBahnRoutesToUpdate.wasUpated
                  ) {
                    const structDB: IDBStruct = await crawlDB(
                      fromID,
                      toID,
                      arrival,
                      departure
                    ); // Get Train routes
                    const newRoutesHash = objHash(structDB.routes);
                    if (
                      newRoutesHash != deutscheBahnRoutesToUpdate.routesHash
                    ) {
                      // Check if Route has Changed
                      deutscheBahnRoutesToUpdate.routes = structDB.routes;
                      currentUser.configTrain.sendInfos = true; // For Info-Mail
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
            bar2.update(0);
            break;
          } // routeCount != constRouteCount
          bar2.increment();
        } // Dates
      } else {
        currentUser.configTrain.active = false;
        currentUser.configTrain.dbrouteids = [];
      } // ics_uid undefiend
      await currentUser.save();
      bar1.increment();
    } // Users
    multibar.stop();
    const endBar = createBar(all_users.length, "", "Users");
    endBar.update(all_users.length);
    endBar.stop();
    await clearUnusedDeutscheBahnRoutes();
  } catch (error) {
    console.error("[ERROR] UpdateDeutscheBahnRoutes:", error);
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

async function clearUnusedDeutscheBahnRoutes() {
  try {
    console.log("\nDeleting unused routes...");
    await DeutscheBahnRoutes.deleteMany({ wasUpated: false }); // Clear not Updated Routes

    const deutscheBahnRoutesToChange: IDeutscheBahnRoutes[] =
      await DeutscheBahnRoutes.find({ wasUpated: true });
    const bar1 = createBar(
      deutscheBahnRoutesToChange.length,
      "Change wasUpated to false",
      "Entries"
    );

    for (let x = 0; x < deutscheBahnRoutesToChange.length; x++) {
      deutscheBahnRoutesToChange[x].wasUpated = false;
      deutscheBahnRoutesToChange[x].save();
      bar1.increment();
    }
    bar1.stop();
  } catch (error) {
    console.error("[ERROR] clearUnusedDeutscheBahnRoutes:", error);
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

function makeUnqiueRouteID(
  icsUID: Number,
  fromID: Number,
  toID: Number,
  day: Number
): String {
  const outIcsUID = icsUID.toString().replace(" ", "-");
  const outFromID = fromID.toString().replace(" ", "-");
  const outToID = toID.toString().replace(" ", "-");
  const outDay = day.toString().replace(" ", "-");
  return `${outIcsUID}|${outFromID}->${outToID}|${outDay}`;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

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
    const searchExistingRoute: IDeutscheBahnRoutes =
      await DeutscheBahnRoutes.findOne({ routeId: uniqueRouteID }); // Search for duplicate
    if (searchExistingRoute) {
      if (index) {
        user.configTrain.dbrouteids[index] = searchExistingRoute.id; // Change to the right RouteID
      } else {
        user.configTrain.dbrouteids.push(searchExistingRoute.id); // Set only the right RouteID
      }
      if (searchExistingRoute.wasUpated == false) {
        const structDB: IDBStruct = await crawlDB(
          fromID,
          toID,
          arrival,
          departure
        ); // Get Train routes
        const newRoutesHash = objHash(structDB.routes);
        if (newRoutesHash != searchExistingRoute.routesHash) {
          // Check if Route has Changed
          searchExistingRoute.routes = structDB.routes;
        }
        searchExistingRoute.wasUpated = true;
        await searchExistingRoute.save();
      }
    } else {
      const structDB: IDBStruct = await crawlDB(
        fromID,
        toID,
        arrival,
        departure
      ); // Get Train routes
      const deutscheBahnRoutes: IDeutscheBahnRoutes =
        await DeutscheBahnRoutes.create({
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

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export async function sendInfoMail() {
  const all_users: IUser[] | null = await User.find({
    "configTrain.sendInfos": true,
  });
  if (!all_users) {
    return;
  }
  for (let userIndex = 0; userIndex < all_users.length; userIndex++) {
    const currentUser = all_users[userIndex];
    const header = `Route-Update the-routemaster.schuetz-andreas.dev`;
    let message = "";

    for (
      let routesIndex = 0;
      routesIndex < currentUser.configTrain.dbrouteids.length;
      routesIndex++
    ) {
      const deutscheBahnRoutes: IDeutscheBahnRoutes[] | null =
        await DeutscheBahnRoutes.find({
          _id: currentUser.configTrain.dbrouteids,
        });
    }

    await sendEmail({
      to: currentUser.email,
      text: message,
      subject: header,
    });
  }
}
