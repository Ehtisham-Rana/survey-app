import { Request, Response } from "express";
import { userRepository } from "../repository";


export class Usercontroller {
    
    //Get All User Controller
    static async findAll(req: Request, res:Response) {
        const user = await userRepository.findAll();
        res.json(user);
    }
    //Get User by id Controller
    static async findById(req: Request, res:Response) {
        const id = Number(req.params.id);
        const user = await userRepository.findById(id);
        res.status(200).json(user);
    }
    //Update User by id Controller
    static async updateUser(req: Request, res:Response) {
        const id = Number(req.params.id);
        const user = await userRepository.updateUser(id, req.body);
        res.status(200).json(user);
    }
    //Delete User by id Controller
    static async deleteUser(req: Request, res:Response) {
        const id = Number(req.params.id);
        const user = await userRepository.deleteUser(id);
        res.status(200).json(user);
    }
}