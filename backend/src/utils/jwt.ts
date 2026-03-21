import jwt from 'jsonwebtoken';

// Jwt logic 
const EXPIRY = '1h'; // Default expiry time for tokens
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRY })
};

export const verifyToken = (token: string): object | null => {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) {
        return null;
    }
    return decoded as object;
};

