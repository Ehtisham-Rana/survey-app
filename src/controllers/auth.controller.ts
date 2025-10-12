
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { userRepository } from "../repository";
import { UserResDto } from "../dto/reponse/user.dto";

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
  //Resend OTP
  static async resendOtp(req: Request, res: Response) {
    const { email } = req.body;
    const user = await userRepository.resendOtp(email);

    res.status(200).json({ messege: "Resend OTP mail sent"});
  }

    
}
