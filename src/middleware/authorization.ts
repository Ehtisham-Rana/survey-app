// src/middlewares/role.middleware.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "./authentication";
import { userRepository } from "../repository";

export const authorize = (roles: string[]) => {
  return async(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.user;
      const user = await userRepository.findById(id); 
    
      if (user && !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Authorization failed" });
    }
  };
};
