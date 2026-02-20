import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv"
dotenv.config();
const JWT_PASSWORD=process.env.JWT_PASSWORD as string;

// Extend Express Request to include userId ->So TypeScript understands: req.userId -> otherwise ts gives error
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const userMiddleware = (req: Request,res: Response,next: NextFunction) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({
        message: "Authorization header missing",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Token missing",
      });
    }

    //Verify token
    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;

    // Check if payload contains id
    if (!decoded.id) {
      return res.status(403).json({
        message: "Invalid token payload",
      });
    }

    // Attach userId to request
    req.userId = decoded.id as string;  //for that we use declare global .... at first

    // Move to next middleware / route
    next();
    
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};