import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
}

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Support both Bearer token and legacy token header for backward compatibility
        let token: string | undefined;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (typeof req.headers.token === 'string') {
            // Legacy support - can be removed later
            token = req.headers.token;
        }

        if (!token) {
            res.status(401).json({ success: false, error: 'Unauthorized - No token provided' });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined');
            res.status(500).json({ success: false, error: 'Server configuration error' });
            return;
        }

        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ success: false, error: 'Invalid token' });
            return;
        }
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ success: false, error: 'Token expired' });
            return;
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({ success: false, error: 'Authentication error' });
    }
};
