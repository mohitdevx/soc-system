import * as z from 'zod';

export const orgRegisterVal = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
    email: z.string()
        .trim()
        .lowercase()
        .regex(/^(?!\.)(?!.*\.\.)([A-Z0-9+_.-]+)@([A-Z0-9.-]+\.[A-Z]{2,})$/i, "Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(100)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirm: z.string()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
});

export type OrgRegisterType = z.infer<typeof orgRegisterVal>;

export const orgLogin = z.object({
    name: z.string()
        .trim()
        .min(2, "Name is required"),
    email: z.string()
        .trim()
        .lowercase()
        .regex(/^(?!\.)(?!.*\.\.)([A-Z0-9+_.-]+)@([A-Z0-9.-]+\.[A-Z]{2,})$/i, "Invalid email address"),
    password: z.string()
        .min(1, "Password is required")
});

export type OrgLoginType = z.infer<typeof orgLogin>;


export const analystRegisterVal = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
    username: z.string()
        .trim()
        .min(2, "Username must be at least 2 characters")
        .max(50, "Username is too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string()
        .trim()
        .lowercase()
        .regex(/^(?!\.)(?!.*\.\.)([A-Z0-9+_.-]+)@([A-Z0-9.-]+\.[A-Z]{2,})$/i, "Invalid email address"),
    organizationId: z.string()
        .trim()
        .min(1, "Organization ID is required")
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid organization ID format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(100)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirm: z.string()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
});

export type AnalystRegisterValType = z.infer<typeof analystRegisterVal>

export const analystLogin = z.object({
    identifier: z.string()
        .trim()
        .min(1, "Email or username is required"),
    password: z.string()
        .min(1, "Password is required")
});

export type AnalystLoginType = z.infer<typeof analystLogin>