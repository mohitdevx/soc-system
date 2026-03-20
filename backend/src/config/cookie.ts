// Cookie configuration for the application

const defaultCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export class Cookie {
    static setCookie(res: any, name: string, value: string, options = {}) {
        const cookieOptions = { ...defaultCookieOptions, ...options };
        res.cookie(name, value, cookieOptions);
    }

    static clearCookie(res: any, name: string) {
        res.clearCookie(name, { ...defaultCookieOptions, maxAge: 0 });
    }

    static getCookie(req: any, name: string) {
        return req.cookies[name] || null;
    }
}