import { prisma } from "../config/prisma.client";
import { AnalystRegisterValType } from "../middleware/zod.validation";
import { AppError } from "../utils/errorClass";
import { generateToken } from "../utils/jwt";

const registerAnalystFunction = async (data: AnalystRegisterValType) => {
    if (!data.name || !data.email || !data.password || !data.organizationId) {
        throw new AppError("All fields are required", 400)
    }

    const existingAnalyst = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (existingAnalyst) {
        throw new AppError("Analyst with this email already exists", 400)
    }

    const analystData = await prisma.user.create({
        data: {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            organizationId: data.organizationId
        }
    })

    if (!analystData) {
        throw new AppError("Analyst registration failed", 500)
    }

    const token = generateToken({ id: analystData.id });

    if (!token) {
        throw new AppError("Something went wrong", 500)
    }

    return { analyst: analystData, token };
}


const loginAnalystFunction = async (data: any) => {
    if (!data.email || !data.password) {
        throw new AppError("Email and password are required", 400)
    }

    const analystData = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (!analystData) {
        throw new AppError("Invalid email or password", 401)
    }

    if (analystData.password !== data.password) {
        throw new AppError("Invalid email or password", 401)
    }

    const token = generateToken({ id: analystData.id });

    if (!token) {
        throw new AppError("Something went wrong", 500)
    }

    return { analyst: analystData, token };
}


export const analystService = {
    registerAnalystFunction,
    loginAnalystFunction
}