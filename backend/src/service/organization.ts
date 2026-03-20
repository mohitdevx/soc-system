import z from "zod"
import { orgRegisterVal } from "../middleware/zod.validation"
import { AppError } from "../utils/errorClass"

type orgSchema = z.infer<typeof orgRegisterVal>

export const orgRegisterFunction = async (data: orgSchema) => {
    if ( !data.org_name || !data.org_email || !data.org_contact || !data.org_password || !data.confirm_password) {
        throw new AppError("All fields are required", 400)
    }

    if (data.org_password !== data.confirm_password) {
        throw new AppError("Passwords do not match", 400)
    }

    // datbase logic 
    const orgData = {
        org_name: data.org_name,
        org_email: data.org_email,
        org_contact: data.org_contact,
        org_password: data.org_password, // In a real application, hash this password
    }

    return orgData;
}



// Organization login function
export const orgLoginFunction = async (data: orgSchema) => {
    if (!data.org_name || !data.org_email || !data.org_password) {
        throw new AppError("All fields are required", 400)
    }

    // datbase logic
    const orgData = {
        org_name: data.org_name,
        org_email: data.org_email,
        org_password: data.org_password, // In a real application, verify this password
    }

    return orgData;
}


// Organization logout function
export const orgLogoutFunction = async (orgId: string) => {
    if (!orgId) {
        throw new AppError("Organization ID is required", 400)
    }

    // Invalidate the session or token for the organization
    // This is a placeholder; actual implementation will depend on your auth system

    return { message: "Organization logged out successfully" }
}

// Organization delete function
export const orgDeleteFunction = async (orgId: string) => {
    if (!orgId) {
        throw new AppError("Organization ID is required", 400)
    }

    // Delete the organization from the database
    // This is a placeholder; actual implementation will depend on your database logic

    return { message: "Organization deleted successfully" }
}