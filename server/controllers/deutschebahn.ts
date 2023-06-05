import { Response, Request } from "express";
import { ErrorResponse, onError } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import { IDBStruct } from "../models/deutschebahnInterfaces";
import { verifyToken } from "../middleware/auth";
import DeutscheBahnRoutes, { IDeutscheBahnRoutes } from '../models/deutschebahn';

exports.getRoutesHash = async (req: Request, res: Response, next: any) => {
    try {
        const user: IUser | null = await verifyToken(req, res);
        if (!user.configTrain.active) {
            return next(new ErrorResponse("Users configTrain.active = false!", 400));
        }

        const deutscheBahnRoutes: IDeutscheBahnRoutes[] | null = await DeutscheBahnRoutes.find({ _id: user.configTrain.dbrouteids });

        let hashes: String[] = [];
        for (let x = 0; x < deutscheBahnRoutes.length; x++) {
            hashes.push(deutscheBahnRoutes[x].routesHash);
        }
        
        res.status(200).json(JSON.stringify(hashes)).end();
    } catch (error) {
        onError(error, next);
    }
}

exports.getRoute = async (req: Request, res: Response, next: any) => {
    const qRouteIdIndex = req.query.routeIdIndex;
    try {
        if (!qRouteIdIndex) {
            return next(new ErrorResponse("RouteId not specified!", 400));
        }
        
        const routeIdIndex = Number(qRouteIdIndex.toString());

        if (!routeIdIndex) {
            return next(new ErrorResponse("RouteId not invalid!", 400));
        }

        const user: IUser | null = await verifyToken(req, res);

        if (!user.configTrain.active) {
            return next(new ErrorResponse("Users configTrain.active = false!", 400));
        }

        const deutscheBahnRoutes: IDeutscheBahnRoutes | null = await DeutscheBahnRoutes.findOne({ _id: user.configTrain.dbrouteids[routeIdIndex] });

        res.status(200).json(JSON.stringify(deutscheBahnRoutes)).end();
    } catch (error) {
        onError(error, next);
    }
}

exports.getAllRoutes = async (req: Request, res: Response, next: any) => {
    try {
        const user: IUser | null = await verifyToken(req, res);

        if (!user.configTrain.active) {
            return next(new ErrorResponse("Users configTrain.active = false!", 400));
        }

        const deutscheBahnRoutes: IDeutscheBahnRoutes[] | null = await DeutscheBahnRoutes.find({ _id: user.configTrain.dbrouteids });

        res.status(200).json(JSON.stringify(deutscheBahnRoutes)).end();
    } catch (error) {
        onError(error, next);
    }
}