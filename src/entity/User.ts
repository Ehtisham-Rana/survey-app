import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import { userRoles } from "../enum/userRole.enum"
import Encrypt from "../utils/encrypt.helper";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string

    @Column({type: "enum", enum: userRoles, default: userRoles.GUEST})
    role: string

    @Column({default: false})
    isVerified: boolean

    @Column({nullable: true})
    otpCode: number
    
    @Column({nullable: true})
    optValidity: Date

    @Column({ nullable: true })
    resetToken: string | null;

    @Column({ nullable: true, type: "timestamp" })
    resetTokenExpiry: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await Encrypt.hashPassword(this.password);
  }

  @BeforeInsert()
  addOtpCodeAndValidTillDate() {
    this.otpCode = this.generateOtp();
    this.optValidity = this.otpValidity();
  }

public generateOtp(){
    return Math.floor((Math.random()*9000) + 1000);
    
}
public otpValidity(){
    return  new Date(Date.now() + 5*60*1000);
}
}
