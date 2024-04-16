import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (error: HttpException, req: any, res: Response, next: NextFunction) => {
    res.status(400).json({
        message: error.message,
        errorCoode: error.errorCode,
        errors: error.errors
    })
}