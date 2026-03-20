import { Request, Response, NextFunction } from "express"
import { AppError } from "./errorClass"
import { ApiResponse } from "./apiResponse";

// Development Errors 
const devErrors = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || 'internal server error';
    const statusCode = err.statuscode || 500;
    return ApiResponse.error(res, message, statusCode, { stack: err?.stack, err: err })
}

// Production Errors 
const prodError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || "something went wrong !"
    const statusCode = err.statuscode || 500;

    if (err.isOperational) {
        return ApiResponse.error(res, message, statusCode)
    }

    return ApiResponse.error(res, "something went wrong !", 500)
}

// Global Errorhandler 
export const globalErrorHandler = async (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'PRODUCTION') {
        return prodError(err, req, res, next);
    }

    return devErrors(err, req, res, next);
}
