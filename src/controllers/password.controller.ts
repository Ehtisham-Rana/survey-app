// src/controllers/password.controller.ts
import { Request, Response } from "express";
import { PasswordService } from "../services/password.service";

export class PasswordController {
  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await PasswordService.forgotPassword(email);
      return res.status(200).json({ message: "Reset email sent" });
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      await PasswordService.resetPassword(token, newPassword);
      return res.status(200).json({ message: "Password reset successful" });
    } catch (err: any) {
      return res.status(err.status || 500).json({ message: err.message });
    }
  }
}
