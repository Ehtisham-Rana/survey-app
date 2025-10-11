import { Request, Response } from "express";
import { userRepository } from "../repository";


export class Usercontroller {
    //Register User Controoler
    static async registerUser(req: Request, res:Response) {
        const user = await userRepository.createUser(req.body);
        res.status(201).json(user);
    }
}