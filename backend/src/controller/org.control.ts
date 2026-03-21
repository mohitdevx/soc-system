import { Request, Response } from "express";
import { orgLoginFunction, orgRegisterFunction } from "../service/organization";
import { ApiResponse } from "../utils/apiResponse";
import { handleAsync } from "../utils/asyncError";
import { orgRegisterVal } from "../middleware/zod.validation";
import { Cookie } from "../config/cookie";

export const registerOrganization = handleAsync(async (req: Request, res: Response) => {
    // Extract organization details from the request body
    if (!req.body) {
        return ApiResponse.fail(res, "Request body is missing", 400);
    }

    const validation = orgRegisterVal.safeParse(req.body);

    if (!validation.success) {
        return ApiResponse.fail(res, "Invalid organization data", 400, validation.error);
    }

    const org = await orgRegisterFunction(req.body);
    Cookie.setCookie(res, "org_token", org.token);
    return ApiResponse.success(res, "organization registered successfully", org);
});



export const loginOrganization = handleAsync(async (req: Request, res: Response) => {
    // Extract login credentials from the request body
    if (!req.body) {
        return ApiResponse.fail(res, "Request body is missing", 400);
    }

    // Validate the organization credentials
    const validation = orgRegisterVal.safeParse(req.body)

    if (!validation.success) {
        return ApiResponse.fail(res, "Invalid organization data", 400, validation.error);
    }

    // Call the organization login function
    const orgData = await orgLoginFunction(req.body);

    if (!orgData) {
        return ApiResponse.fail(res, "Organization login failed", 401);
    }

    // set cookie with the token
    Cookie.setCookie(res, "org_token", orgData.token);

    // Send a success response with the token
    return ApiResponse.success(res, "Login successful", orgData.orgData);
});
