import { Repository } from "typeorm";
import { User } from "../entity/User";
import Encrypt from "../utils/encrypt.helper";
import sendEmail from "../utils/mail.util";
import { UserResDto } from "../dto/reponse/user.dto";


export class Userservice{
    
    constructor(private userRepository: Repository<User>){}
   
    //Create User Service
    async createUser(user : User) : Promise <User>{

        const otpCode = Userservice.generateOtp();
        const otpExpiry = Userservice.otpValidity();
       
        const payload = {
            ...user,
            password: await Encrypt.hashPassword(user.password),
            otpCode: otpCode,
            optValidity: otpExpiry
        };
              
        const newUser = this.userRepository.create(payload);
        await this.userRepository.save(newUser);
        await sendEmail(user.email , otpCode);
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

    //Verifying otp  
    async verifyOtp (email: string , otp: number): Promise <User >{
        const user = await this.userRepository.findOneBy({email})
        const validity = new Date(Date.now()) < user.optValidity;

        if (!user){ throw new Error("User do not exists") };
        if ( otp === user.otpCode && validity === true) {
            user.isVerified = true;
            user.otpCode = null;
            user.optValidity = null;
        } else {
            throw new Error("Invalid or expired OTP");
        }
            
        await this.userRepository.save(user);
        return user;
    }

    private static generateOtp(){
        const otpCode = Math.floor((Math.random()*9000) + 1000);
        return otpCode;
    }
    private static otpValidity(){
        const otpExpiry = new Date(Date.now() + 5*60*1000);
        return otpExpiry;
    }
}      