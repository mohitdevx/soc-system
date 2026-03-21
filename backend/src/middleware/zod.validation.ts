import * as z from 'zod';

export const orgRegisterVal = z.object({
    org_name: z.string().min(3).max(18).trim(),
    org_email:z.email(),
    org_contact:z.string().min(3).max(58),
    org_password:z.string().min(8).max(58),
    confirm_password: z.string().min(8).max(58)
});

export type OrgRegisterType = z.infer<typeof orgRegisterVal>;

export const orgLogin = z.object({
    org_name: z.string().min(3).max(18).trim(),
    org_email:z.email(),
    org_password:z.string().min(8).max(58),
    confirm_password: z.string().min(8).max(58)
});

export type OrgLoginType = z.infer<typeof orgLogin>;