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
      return res
        .status(err.status || 500)
        .json({ message: err.message || "Login failed" });
    }
  }

  // ✅ Register User Controller
  static async registerUser(req: Request, res: Response) {
    try {
      console.log("Incoming register request:", req.body);

      const user = await userRepository.createUser(req.body);
      console.log("✅ User created:", user);

      return res
        .status(201)
        .json({ success: true, user: new UserResDto(user) });
    } catch (error: any) {
      console.error("❌ Error in registerUser:", error);

      // ✅ Duplicate email handling (Postgres unique constraint)
      if (error.code === "23505") {
        return res.status(400).json({
          success: false,
          message: "Email already exists. Please use a different email.",
        });
      }

      // ✅ Fallback for other errors
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message || error,
      });
    }
  }

  // Verify OTP

static async verifyOtp(req: Request, res: Response) {
  const { email, otpCode } = req.body;
  try {
    const user = await userRepository.verifyOtp(email, otpCode);
    return res.status(200).json({ 
      success: true,
      message: "Account verified successfully",
      user: new UserResDto(user)
    });
  } catch (error: any) {
    // Check for OTP errors and return proper status
    if (error.message === "Invalid or expired OTP") {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Fallback for other errors
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}


  // Resend OTP
  static async resendOtp(req: Request, res: Response) {
    const { email } = req.body;
    const user = await userRepository.resendOtp(email);
    res.status(200).json({ message: "Resend OTP mail sent" });
  }
}
