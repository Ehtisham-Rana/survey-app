
import { Request, Response } from "express";
import { userRepository } from "../repository";
import { UserResDto } from "../dto/reponse/user.dto";
import Mailer from "../utils/mail.util";
import Encrypt from "../utils/encrypt.helper";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findByEmail(email);
      if (!user) throw { status: 401, message: "Invalid email or password" };

      const valid = await Encrypt.comparePassword(password, user.password);
      if (!valid) throw { status: 401, message: "Invalid email or password" };

      if (!user.isVerified)
        throw { status: 403, message: "Please verify your account first" };

      const accessToken = await Encrypt.generateToken({ id: user.id });
      const refreshToken = await Encrypt.generateRefreshToken({ id: user.id });

      return res.status(200).json({
        accessToken,
        refreshToken,
        user: new UserResDto(user),
      });
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message || "Login failed" });
    }
  }

  //Register User Controller
  static async registerUser(req: Request, res:Response) {

    const user = await userRepository.createUser(req.body); 
    res.status(201).json( {user:new UserResDto(user)});
  }
  
  //Verify OTP
  static async verifyOtp(req: Request, res: Response) {
    const { email, otpCode} = req.body;
    const user = await userRepository.findByEmail(email);

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified" });
        } else {
        const validity = new Date(Date.now()) < user.optValidity;
        if ( otpCode === user.otpCode && validity === true) {
          user.isVerified = true;
          user.otpCode = null;
          user.optValidity = null;
                        
          await userRepository.updateUser(user.id, user);
          res.status(200).json({ message: "User is verified successfully"});
          } else {
          return res.status(404).json({ message: "Invalid or Expired OTP"})
        }
      }
    } else {
      return res.status(404).json({ message: "User not found"});
    }
  }
  
  //Resend OTP
  static async resendOtp(req: Request, res: Response) {
    const { email } = req.body;
    const user = await userRepository.findByEmail(email);
     
    const otpCode = user.generateOtp();
    const otpExpiry = user.otpValidity();
    if (!user){ 
      throw new Error("User do not exists") 
    } else {
      user.otpCode = otpCode;
      user.optValidity = otpExpiry;
    }
    await userRepository.updateUser(user.id, user);
    await Mailer.sendEmailOtp(user.email , otpCode);
    return res.status(200).json({ message: "OTP code sent successfully"});;
  }
    
}
