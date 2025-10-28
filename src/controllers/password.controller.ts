// src/controllers/password.controller.ts
import { Request, Response } from "express";
import { userRepository } from "../repository";
import Mailer from "../utils/mail.util";
import * as crypto from "crypto";
import * as dotenv from "dotenv";
import Encrypt from "../utils/encrypt.helper";
import { UserResDto } from "../dto/reponse/user.dto";

dotenv.config();

export class PasswordController {
  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await userRepository.findByEmail(email);
      if (!user) { throw new Error ("User not found") };
      
      // Generate reset token
      const token = crypto.randomBytes(32).toString("hex");
      user.resetToken = token;
      user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      await userRepository.updateUser(user.id, user);
  
      // Create reset link
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      
      await Mailer.sendEmailLink(user.email, resetLink);
      return res.status(200).json({ 
        user: new UserResDto(user), 
        message: "Password reset email sent successfully." 
      });
    
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      const user = await userRepository.findByEmail(email);
      const validity = new Date() < user.resetTokenExpiry;
      
      if(user.resetTokenExpiry && validity === true){
        //hash new password
        const hash = await Encrypt.hashPassword(newPassword);
        user.password = hash;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await userRepository.updateUser(user.id, user)
        return res.status(200).json({ message: "Password reset successful" });
      } else {
        return res.status(404).json({ message: "Invalid or Expired Token"})
      }
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  }
}
