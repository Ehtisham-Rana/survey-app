// middlewares/validation.middleware.ts
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDTO = (DTOClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(DTOClass, req.body);
    const errors = await validate(dtoObj);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
};
