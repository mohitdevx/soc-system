import { Request, Response, NextFunction } from "express"
import { OrgRegisterType, orgRegisterVal } from "./zod.validation"
import { ApiResponse } from "../utils/apiResponse";

export const zodValidator = async (myfunc: () => OrgRegisterType, body) => {
    const validation = myfunc

    if (!validation.success) {
        return ApiResponse.fail(res, 'validation error', 400, validation.error)
    }
}