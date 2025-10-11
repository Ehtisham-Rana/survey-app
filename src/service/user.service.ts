import { Repository } from "typeorm";
import { User } from "../entity/User";


export class Userservice{
    constructor(private userRepository: Repository<User>){}
   
    //Register User Service
    async createUser(user : User): Promise<User>{
              
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }
}      