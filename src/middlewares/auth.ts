import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

const authMiddleware = async(req: any, res:Response, next:NextFunction) => {
    // extract the token from header
    const token = req.headers.authorization!

    // if token is not present, throw an error of unauthorized
    if(!token) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
    
    try {
        // if the token is present, verify that token and extract the payload
        const payload = jwt.verify(token, JWT_SECRET) as any

        // to get the user from the payload
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }
        // to attach the user to the current request object
        req.user = user!
        next()
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}

export default authMiddleware