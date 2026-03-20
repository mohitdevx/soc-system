import { Request, Response } from "express";
import { orgRegisterFunction } from "../service/organization";
import { ApiResponse } from "../utils/apiResponse";
import { handleAsync } from "../utils/asyncError";

export const registerOrganization = handleAsync(async (req: Request, res: Response) => {
    // Extract organization details from the request body
    if (!req.body) {
        return ApiResponse.fail(res, "Request body is missing", 400);
    }

    const org = orgRegisterFunction(req.body);

    // Send a success response with the organization data
    return ApiResponse.success(res, "organization registered successfully", org);
});


export const loginOrganization = handleAsync(async (req: Request, res: Response) => {
    // Extract login credentials from the request body
    if (!req.body) {
        return ApiResponse.fail(res, "Request body is missing", 400);
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return ApiResponse.fail(res, "Email and password are required", 400);
    }

    // Perform login logic here (e.g., validate credentials, generate token)
    // For demonstration, we'll assume the login is successful and return a dummy token
    const token = "dummy-jwt-token";

    // Send a success response with the token
    return ApiResponse.success(res, "Login successful", { token });
});
