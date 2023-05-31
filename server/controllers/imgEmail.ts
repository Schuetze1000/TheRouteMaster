import { ErrorResponse } from "../utils/errorResponse";
import { Response, Request } from "express";
import fs from  'fs';

exports.headerLogo = async (req: Request, res: Response, next: any) => {
    try {
        const img = fs.readFileSync("./data/email/images/headerLogo.ong");
        res.status(200).send(img.toString());
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.footerLogo = async (req: Request, res: Response, next: any) => {
    try {
        const img = fs.readFileSync("./data/email/images/footerLogo.png");
        res.status(200).send(img.toString());
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.passwordLogo = async (req: Request, res: Response, next: any) => {
    try {
        const img = fs.readFileSync("./data/email/images/passwordLogo.png");
        res.status(200).send(img.toString());
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.chatLogo = async (req: Request, res: Response, next: any) => {
    try {
        const img = fs.readFileSync("./data/email/images/chatLogo");
        res.status(200).send(img.toString());
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.chatBackground = async (req: Request, res: Response, next: any) => {
    try {
        const img = fs.readFileSync("./data/email/images/chatBackground");
        res.status(200).send(img.toString());
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

exports.githubLogo = async (req: Request, res: Response, next: any) => {
    try {
        const img = fs.readFileSync("./data/email/images/github-logo-black.png");
        res.status(200).send(img.toString());
    } catch (error:any) {
        return next(new ErrorResponse(error.message, 400));
    }
}

