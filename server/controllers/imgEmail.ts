import { ErrorResponse } from "../utils/errorResponse";
import { Response, Request } from "express";
import path from "path";

exports.headerLogo = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/headerLogo.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.footerLogo = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/footerLogo.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.passwordLogo = async (req: Request, res: Response, next: any) => {
    try {
        
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/passwordLogo.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.chatLogo = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/chatLogo.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.chatBackground = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/chatBackground.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.githubLogo = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/github-logo-black.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.train = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/train.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.tram = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/tram.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.bus = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/bus.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.walk = async (req: Request, res: Response, next: any) => {
    try {
        res.status(200).sendFile(path.resolve( __dirname + "/../data/email/images/walk1.png"));
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

