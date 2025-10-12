// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message || "Login failed" });
    }
  }
}
import { Request, Response } from "express";
import { userRepository } from "../repository";
import { UserResDto } from "../dto/reponse/user.dto";


export class AuthController {
       //Register User Controller
    static async registerUser(req: Request, res:Response) {

        const user = await userRepository.createUser(req.body); 
        res.status(201).json({ user: new UserResDto(user)});
    }
    //Verify OTP
     static async verifyOtp(req: Request, res: Response) {
        const { email, otpCode} = req.body;
        const user = await userRepository.verifyOtp(email, otpCode);

        res.status(200).json({ user: new UserResDto(user)});
    }


    
}
