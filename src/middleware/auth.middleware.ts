import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../globals';
import jwt from 'jsonwebtoken';

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No se ha enviado un token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res
      .status(500)
      .json({ message: 'Ha ocurrido un error interno del servidor' });
  }
};
