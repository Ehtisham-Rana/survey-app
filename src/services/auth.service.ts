
import { UserResDto } from "../dto/reponse/user.dto";
import { userRepository } from "../repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login(email: string, password: string) {

    const user = await userRepository.findByEmail(email);
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
       user: new UserResDto(user),
    };
  }

}
