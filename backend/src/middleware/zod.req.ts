import { Request, Response, NextFunction } from "express"
import { orgRegisterVal } from "./zod.validation"
import { ApiResponse } from "../utils/apiResponse";

export const zodValidator = async (req: Request, res: Response, next: NextFunction) => {
    const validation = orgRegisterVal.safeParse(req.body);

    if (!validation.success) {
        return ApiResponse.fail(res, 'validation error', 400, validation.error)
    }

    next();
}