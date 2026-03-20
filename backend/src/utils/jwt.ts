import jwt from 'jsonwebtoken';

// Jwt logic 
const EXPIRY = '1h'; // Default expiry time for tokens

export const generateToken = (payload: object, secret: string, expiresIn: string): string => {
    return jwt.sign(payload, secret, { expiresIn: EXPIRY })
};

export const verifyToken = (token: string, secret: string): object | null => {
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
        return null;
    }

    return decoded as object;
};

