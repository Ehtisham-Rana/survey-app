// src/services/UserService.ts
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { userRoles } from "../enum/userRole.enum";
import Encrypt from "../utils/encrypt.helper";
import { sendEmailOtp } from "../utils/mail.util";
import { UserResDto } from "../dto/reponse/user.dto"; // updated file name

export class Userservice {
    constructor(private userRepository: Repository<User>) {}

    /**
     * Create a new survey creator user
     * Assigns role CREATOR automatically
     * Hashes password, generates OTP, and returns DTO-safe user
     */
    async createUser(user: Partial<User>): Promise<UserResDto> {
        // Generate OTP & expiry
        const otpCode = Userservice.generateOtp();
        const otpExpiry = Userservice.otpValidity();

        // Prepare user payload
        const payload: Partial<User> = {
            ...user,
            password: await Encrypt.hashPassword(user.password!),
            otpCode,
            optValidity: otpExpiry,
            role: userRoles.CREATOR, // assign survey creator role
            isVerified: false,
        };

        // Create & save
        const newUser = this.userRepository.create(payload);
        await this.userRepository.save(newUser);

        // Send OTP email
        await sendEmailOtp(newUser.email, otpCode);

        // Return safe DTO
        return new UserResDto(newUser);
    }

    /** Get all users (with surveys) */
    async findAll(): Promise<UserResDto[]> {
        const users = await this.userRepository.find({ relations: ["surveys"] });
        return users.map(user => new UserResDto(user));
    }

    /** Get user by ID (with surveys) */
    async findById(id: number): Promise<UserResDto | null> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ["surveys"],
        });
        return user ? new UserResDto(user) : null;
    }

    /** Get user by email (with surveys) */
    async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ["surveys"],  // optional
    });
  }

    /** Update user */
    async updateUser(id: number, userData: Partial<User>): Promise<UserResDto | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return null;

        this.userRepository.merge(user, userData);
        await this.userRepository.save(user);

        return new UserResDto(user);
    }

    /** Delete user */
    async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete({ id });
        return result.affected !== 0;
    }

    /** Verify OTP */
    async verifyOtp(email: string, otp: string | number): Promise<UserResDto> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new Error("User does not exist");

        const now = new Date();
        const isValid = user.optValidity && now < user.optValidity;

        if (user.otpCode && Number(otp) === user.otpCode && isValid) {
            user.isVerified = true;
            user.otpCode = null;
            user.optValidity = null;
            await this.userRepository.save(user);
            return new UserResDto(user);
        } else {
            throw new Error("Invalid or expired OTP");
        }
    }

    /** Resend OTP */
    async resendOtp(email: string): Promise<UserResDto> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new Error("User does not exist");

        const otpCode = Userservice.generateOtp();
        const otpExpiry = Userservice.otpValidity();

        user.otpCode = otpCode;
        user.optValidity = otpExpiry;

        await this.userRepository.save(user);
        await sendEmailOtp(user.email, otpCode);

        return new UserResDto(user);
    }

    /** Generate 4-digit OTP */
    private static generateOtp(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }

    /** OTP validity 5 minutes from now */
    private static otpValidity(): Date {
        return new Date(Date.now() + 5 * 60 * 1000);
    }
}
