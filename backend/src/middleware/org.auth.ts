// Organization Authentication Middleware
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/apiResponse";

export const orgAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token){
        return ApiResponse.fail(res, "Unauthorized access", 401);
    }

    const fakeDb = {};

    
}