import z from "zod"
import { orgRegisterVal } from "../middleware/zod.validation"
import { AppError } from "../utils/errorClass"
import { Organization } from "../generated/prisma/browser"
import { prisma } from "../config/prisma.client"
import { comparePasswords, hashPassword } from "../utils/bcrypt"
import { generateToken } from "../utils/jwt"
import { redis } from "../config/redis"
import { prismaVersion } from "../generated/prisma/internal/prismaNamespace"

type orgSchema = z.infer<typeof orgRegisterVal>

interface Register {
    orgData: Organization,
    token: string
}

const orgRegisterFunction = async (data: orgSchema): Promise<Register> => {
    if (!data.name || !data.email || !data.password || !data.password) {
        throw new AppError("All fields are required", 400)
    }
    const existingOrg = await prisma.organization.findUnique({
        where: {
            email: data.email,
        },
    })
    if (existingOrg) {
        throw new AppError("Organization with this email already exists", 400)
    }
    // datbase logic 
    const orgData: Organization = await prisma.organization.create({
        data: {
            name: data.name,
            email: data.email,
            password: await hashPassword(data.password),
        }
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
const orgLoginFunction = async (data: orgSchema) => {
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

const getAnalystsFunction = async (orgId: string) => {
    if (!orgId) {
        throw new AppError("Organization ID is required", 400);
    }

    const analysts = await prisma.memberShips.findMany({
        where: {
            organizationId: orgId,
            status: "ACTIVE"
        },
        select: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    })
    
    return analysts;
}

export const orgService = {
    orgRegisterFunction,
    orgLoginFunction,
    getAnalystsFunction
}

