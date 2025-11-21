import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Question } from "./Question";
import { Response } from "./Response";

@Entity({ name: "surveys" })
export class Survey {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @ManyToOne(() => User, user => user.surveys)
  owner!: User;

  @OneToMany(() => Question, q => q.survey, { cascade: true })
  questions!: Question[];

  @OneToMany(() => Response, response => response.survey, { cascade: true })
  responses!: Response[];

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
