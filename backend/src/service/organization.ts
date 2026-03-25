import z, { tuple } from "zod"
import { orgRegisterVal } from "../middleware/zod.validation"
import { AppError } from "../utils/errorClass"
import { Organization, Prisma } from "../generated/prisma/browser"
import { prisma } from "../config/prisma.client"
import { comparePasswords, hashPassword } from "../utils/bcrypt"
import { generateToken } from "../utils/jwt"
import { redis } from "../config/redis"

type orgSchema = z.infer<typeof orgRegisterVal>

interface Register {
    orgData: Organization,
    token: string
}

export const orgRegisterFunction = async (data: orgSchema): Promise<Register> => {
    if (!data.name || !data.email || !data.contact || !data.password || !data.password) {
        throw new AppError("All fields are required", 400)
    }

    // datbase logic 
    const orgData: Organization = await prisma.organization.create({
        data: {
            name: data.name,
            email: data.email,
            contactName: data.contact,
            password: await hashPassword(data.password)
        }
    }).catch((error: Prisma.PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
            throw new AppError("Organization with this name or email already exists", 400)
        }
        throw new AppError("An error occurred while registering the organization", 500)
    })

    if (!orgData) {
        throw new AppError("Organization registration failed", 500)
    }

    const token = generateToken({ id: orgData.id });

    if (!token) {
        throw new AppError("Token generation failed", 500)
    }

    return { orgData, token };
}

// Organization login function
export const orgLoginFunction = async (data: orgSchema) => {
    if (!data.name || !data.email || !data.password) {
        throw new AppError("All fields are required", 400)
    }

    const client = await redis;
    let orgData: any = await client.json.get(data.email);
    if (!orgData) {
        orgData = await prisma.organization.findUnique({
            where: {
                email: data.email,
            },
        })
        if (!orgData) {
            throw new AppError("Organization not found", 404)
        }
        console.log("Organization data fetched from database:", orgData);
        await client.json.set(data.email, ".", orgData);
    }

    // Check password
    const isPasswordValid = await comparePasswords(data.password, orgData?.password)

    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401)
    }

    const token = generateToken({ id: orgData.id });

    if (!token) {
        throw new AppError("Token generation failed", 500)
    }

    return { orgData, token };
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