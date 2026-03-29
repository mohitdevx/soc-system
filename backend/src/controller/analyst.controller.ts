import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { handleAsync } from "../utils/asyncError";
import { analystLogin, analystRegisterVal } from "../middleware/zod.validation";
import z from "zod";
import { analystService } from "../service/analyst.service";
import { Cookie } from "../config/cookie";

const registerAnalyst = handleAsync(async (req: Request, res: Response) => {
    if (!req.body) {
        ApiResponse.fail(res, 'missing or invalid body', 400, { message: 'validation error' })
    }

    const validations = analystRegisterVal.safeParse(req.body);

    if (!validations.success) {
        return ApiResponse.fail(res, 'validation error', 400, { errors: z.formatError(validations.error) })
    }

    const analystData = await analystService.registerAnalystFunction(validations.data);

    Cookie.setCookie(res, 'token', analystData.token);
    return ApiResponse.created(res, 'Analyst registered successfully', analystData.analyst)

})


const loginAnalyst = handleAsync(async (req: Request, res: Response) => {
    if (!req.body) {
        ApiResponse.fail(res, 'missing or invalid body', 400, { message: 'validation error' })
    }

    const validations = analystLogin.safeParse(req.body);

    if (!validations.success) {
        return ApiResponse.fail(res, 'validation error', 400, { errors: z.formatError(validations.error) })
    }

    const analystData = await analystService.loginAnalystFunction(validations.data);

    Cookie.setCookie(res, 'token', analystData.token);
    return ApiResponse.success(res, 'Analyst logged in successfully', analystData.analyst)

});

export const analystController = {
    registerAnalyst,
    loginAnalyst
}