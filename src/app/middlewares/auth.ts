import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware de autenticación: verifica Authorization: Bearer <token>
 * Si el token es válido, añade `req.user = { id, email }` y llama next().
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.slice(7).trim();
  const jwtSecret = process.env.JWT_SECRET || 'dev_secret';
  try {
    const payload = jwt.verify(token, jwtSecret) as any;
    // Adjuntamos usuario al request para uso en controladores
    (req as any).user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(401).json({ message: 'Token inválido' });
  }
}