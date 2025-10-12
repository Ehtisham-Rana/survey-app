import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Userservice } from "../services/user.service";


export const userRepository = new Userservice(AppDataSource.getRepository(User));
