import { Response, Request } from "express";
import { ErrorResponse, onError } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { IDBStruct } from "../models/deutschebahnInterfaces";
import { verifyToken } from "../middleware/auth";
import DeutscheBahnRoutes, { IDeutscheBahnRoutes } from '../models/deutschebahn';
const dbProfile = require("hafas-client/p/db/index.js");
const createClient = require("hafas-client");


exports.getRoutesHash = async (req: Request, res: Response, next: any) => {
    try {
        const user: IUser | null = await verifyToken(req, res);
        if (!user.configTrain.active) {
            return next(new ErrorResponse("Users configTrain.active = false!", 400));
        }

        const deutscheBahnRoutes: IDeutscheBahnRoutes[] | null = await DeutscheBahnRoutes.find({ _id: user.configTrain.dbrouteids });

        let hashes = [{}]

        for (let x = 0; x < deutscheBahnRoutes.length; x++) {
            hashes.push({
                routeid: String(deutscheBahnRoutes[x]._id),
                hash: deutscheBahnRoutes[x].routesHash
            });
        }
        
        res.status(200).json(hashes).end();
    } catch (error) {
        onError(error, next);
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getRoute = async (req: Request, res: Response, next: any) => {
    const { routeId:qRouteId } = req.query;
    try {
        const routeId:String = String(qRouteId);

        if (!qRouteId) {
            return next(new ErrorResponse("Please provide a valid RouteId!", 400));
        }
        
        const user: IUser | null = await verifyToken(req, res);

        if (!user.configTrain.active) {
            return next(new ErrorResponse("Users configTrain.active = false!", 400));
        }

        const index = user.configTrain.dbrouteids.indexOf(routeId);
        if (index == -1) {
            return next(new ErrorResponse("Please provide a valid RouteId!", 400));
        }

        const deutscheBahnRoutes: IDeutscheBahnRoutes | null = await DeutscheBahnRoutes.findOne({ _id: routeId });

        res.status(200).json(deutscheBahnRoutes).end();
    } catch (error) {
        onError(error, next);
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getAllRoutes = async (req: Request, res: Response, next: any) => {
    try {
        const user: IUser | null = await verifyToken(req, res);

        if (!user.configTrain.active) {
            return next(new ErrorResponse("Users configTrain.active = false!", 400));
        }

        const deutscheBahnRoutes: IDeutscheBahnRoutes[] | null = await DeutscheBahnRoutes.find({ _id: user.configTrain.dbrouteids });

        res.status(200).json(deutscheBahnRoutes).end();
    } catch (error) {
        onError(error, next);
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.getNeabyStations = async (req: Request, res: Response, next: any) => {
    const { latitude:qlatitude, longitude:qlongitude, distance:qdistance} = req.query;
    try {
        const latitude  = Number(qlatitude);
        const longitude  = Number(qlongitude);
        const distance  = Number(qdistance);
        if (!latitude || !longitude || !distance || distance > 2000 || distance < 300) {
            return next(new ErrorResponse("Please provide a valid Query!", 400));
        }

        await verifyToken(req, res);
        const client = createClient(dbProfile, "https://the-routemaster.schuetz-andreas.dev/")

        const stations = await client.nearby({
            type: 'location',
            latitude: latitude,
	        longitude: longitude
        }, {distance: distance});
       
        res.status(200).json(stations).end();
    } catch (error) {
        onError(error, next);
    }
}