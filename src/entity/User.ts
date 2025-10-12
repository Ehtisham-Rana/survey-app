import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { userRoles } from "../enum/userRole.enum"

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
}
