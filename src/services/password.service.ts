// src/services/password.service.ts
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as dotenv from "dotenv";
import { sendEmailLink } from "../utils/mail.util";

dotenv.config();

export class PasswordService {
  static async forgotPassword(email: string) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email } });
    if (!user) throw { status: 404, message: "User not found" };

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await repo.save(user);

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    await sendEmailLink(user.email, resetLink);
    
    return { message: "Password reset email sent successfully." };
  }

  static async resetPassword(token: string, newPassword: string) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { resetToken: token } });

    if (!user) throw { status: 400, message: "Invalid or expired token" };
    if (new Date() > user.resetTokenExpiry!)
      throw { status: 400, message: "Token expired" };

    // Hash new password
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await repo.save(user);

    return { message: "Password reset successful." };
  }
}
