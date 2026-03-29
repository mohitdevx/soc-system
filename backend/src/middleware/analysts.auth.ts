// Organization Authentication Middleware
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/prisma.client";
import { redis } from "../config/redis";

export const analystAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token && !req.headers.authorization) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const client = await redis;
    let analystData: any = await client.json.get(decoded.id);
    if (!analystData) {
        analystData = await prisma.member.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        if (analystData) {
            await client.json.set(decoded.id, ".", analystData);
        }
    }

    if (!analystData) {
        return ApiResponse.fail(res, "Analyst not found", 404);
    }

    req.analyst = analystData;
    next();
}