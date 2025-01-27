import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// interface JwtPayloadWithUserId extends jwt.JwtPayload {
//   userId: string;
// }

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: "Authorization header is missing or invalid"
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // @ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token"
    });
  }
};
