import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { userRoles } from "../enum/userRole.enum";
import { Survey } from "./Survey";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: userRoles, default: userRoles.GUEST })
    role: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    otpCode: number;

    @Column({ nullable: true })
    optValidity: Date;

    @Column({ nullable: true })
    resetToken: string | null;

    @Column({ nullable: true, type: "timestamp" })
    resetTokenExpiry: Date | null;

    @OneToMany(() => Survey, survey => survey.owner)
    surveys: Survey[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
