import { Request, Response } from "express";
import { userRepository } from "../repository";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { AuthRequest } from "../middleware/auth.middleware";

export class Usercontroller {

    //Get All User Controller
    static async findAll(req: Request, res: Response) {
        const user = await userRepository.findAll();
        res.json(user);
    }
    //Get User by id Controller
    static async findById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await userRepository.findById(id);
        res.status(200).json(user);
    }
    //Update User by id Controller
    static async updateUser(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await userRepository.updateUser(id, req.body);
        res.status(200).json(user);
    }
    //Delete User by id Controller
    static async deleteUser(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await userRepository.deleteUser(id);
        res.status(200).json(user);
    }

     //  Get Profile of Authenticated User
  static async getProfile(req: AuthRequest, res: Response) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    });
  }
}