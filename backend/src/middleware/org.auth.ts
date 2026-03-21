// Organization Authentication Middleware
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/prisma.client";
import { redis } from "../config/redis";

export const orgAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.org_token && !req.headers.authorization) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const token = req.cookies.org_token || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const client = await redis;
    let orgData: any = await client.json.get(decoded.id);
    if (!orgData) {
        orgData = await prisma.organization.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                contactName: true
            }
        })

        if (orgData) {
            await client.json.set(decoded.id, ".", orgData);
        }
    }

    if (!orgData) {
        return ApiResponse.fail(res, "Organization not found", 404);
    }

    req.org = orgData;
    next();
}