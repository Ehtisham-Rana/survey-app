// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1️⃣ Get token from Authorization header
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = header.split(" ")[1];
    if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
    }
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
    }
    // 3️⃣ Attach decoded user data to request
    const { id: userId } = decoded;
    req.user = userId;
    
    // 4️⃣ Continue to next middleware or controller
    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err.name, err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
