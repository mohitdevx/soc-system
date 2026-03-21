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
    contact: z.string()
        .trim()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid contact number format"),
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