import { Request, Response } from "express";
import { userRepository } from "../repository";


export class AuthController {

    //Register User Controller
    static async registerUser(req: Request, res:Response) {
        const user = await userRepository.createUser(req.body);
        res.status(201).json(user);
    }
}