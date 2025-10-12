import { Request, Response } from "express";
import { userRepository } from "../repository";
import { UserResDto } from "../dto/reponse/user.dto";
import sendEmail from "../utils/mail.util";


export class AuthController {

    //Register User Controller
    static async registerUser(req: Request, res:Response) {
        const otpCode = Math.floor(Math.random()*10000);
        const otpExpiry = new Date(Date.now() + 5*60*1000);
        const user = await userRepository.createUser(req.body, otpCode, otpExpiry);
        
        if (user) {
           await sendEmail(user.email , otpCode);
        }
        res.status(201).json({ user: new UserResDto(user)});
    }


}