import { Repository } from "typeorm";
import { User } from "../entity/User";
import Mailer from "../utils/mail.util";



export class Userservice{
    
    constructor(private userRepository: Repository<User>){}
   
    //Create User Service
    async createUser(user : User) : Promise <User>{

        const payload = {
            ...user,
        };
              
        const newUser = this.userRepository.create(payload);
        await this.userRepository.save(newUser);
        await Mailer.sendEmailOtp(newUser.email , newUser.otpCode);
        return newUser;
    }
    //Get All Users service
    async findAll() : Promise <User[] | null> {
        return this.userRepository.find();
    }

    //Get User by id service
    async findById(id: number) : Promise <User | null> {
        return this.userRepository.findOneBy({ id });
    }

    //Get User by email service
    async findByEmail(email: string) : Promise <User | null> {
        return this.userRepository.findOneBy({ email });
    }

    //Update User by id service
    async updateUser(id: number , userData: Partial<User>) : Promise <User | null> {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) return null;

        this.userRepository.merge(user, userData),
        await this.userRepository.save(user)
        return user;
    }

    //Delete User by id service
    async deleteUser(id: number) : Promise <boolean> {
        const result = await this.userRepository.delete({ id });
        return result.affected !==0;
    }

}      