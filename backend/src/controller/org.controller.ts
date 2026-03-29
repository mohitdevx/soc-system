import { Request, Response } from "express";
import { orgService } from "../service/org.service";
import { ApiResponse } from "../utils/apiResponse";
import { handleAsync } from "../utils/asyncError";
import { orgLogin, orgRegisterVal } from "../middleware/zod.validation";
import { Cookie } from "../config/cookie";
import z from "zod";

/*
* Organization Controller
*  
*/
const registerOrganization = handleAsync(async (req: Request, res: Response) => {
    if (!req.body) {
        return ApiResponse.fail(res, "Request body is missing", 400);
    }
    const validation = orgRegisterVal.safeParse(req.body);
    if (!validation.success) {
        return ApiResponse.fail(res, "Invalid organization data", 400, { error: z.treeifyError(validation.error) });
    }
    const org = await orgService.orgRegisterFunction(req.body);
    Cookie.setCookie(res, "token", org.token);
    return ApiResponse.success(res, "organization registered successfully", org.orgData);
});


/* 
*
* Organization Login Controller
*/
const loginOrganization = handleAsync(async (req: Request, res: Response) => {
    if (!req.body) {
        return ApiResponse.fail(res, "Request body is missing", 400);
    }
    const validation = orgLogin.safeParse(req.body)

    if (!validation.success) {
        return ApiResponse.fail(res, "Invalid organization data", 400, z.treeifyError(validation.error));
    }
    const orgData = await orgService.orgLoginFunction(req.body);

    if (!orgData) {
        return ApiResponse.fail(res, "Organization login failed", 401);
    }
    Cookie.setCookie(res, "token", orgData.token);
    return ApiResponse.success(res, "Login successful", orgData.orgData);
});


const getOrganization = handleAsync(async (req: Request, res: Response) => {
    return ApiResponse.success(res, "Organization data retrieved successfully", req.org);
});


const getAnalysts = handleAsync(async (req: Request, res: Response) => {
    
    const analysts = await orgService.getAnalystsFunction(req.org.id);
    return ApiResponse.success(res, "Analysts retrieved successfully", analysts);
})

export const orgController = {
    registerOrganization,
    loginOrganization,
    getOrganization
}