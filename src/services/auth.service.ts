// src/services/auth.service.ts
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


export class AuthService {
  static async login(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) throw { status: 401, message: "Invalid email or password" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw { status: 401, message: "Invalid email or password" };

    if (!user.isVerified)
      throw { status: 403, message: "Please verify your account first" };

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return {
      accessToken,
      user: { id: user.id, email: user.email },
    };
  }
}
