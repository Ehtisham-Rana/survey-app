import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { userRoles } from "../enum/userRole.enum"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  resetToken: string | null;
    @Column()
    email: string

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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

  @Column({ nullable: true, type: "timestamp" })
  resetTokenExpiry: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
