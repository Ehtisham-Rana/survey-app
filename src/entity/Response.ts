import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn
} from "typeorm";
import { Survey } from "./Survey";
import { Answer } from "./Answer";
import { User } from "./User";

@Entity("responses")
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, survey => survey.responses, { onDelete: "CASCADE" })
  survey: Survey;

  @OneToMany(() => Answer, answer => answer.response, { cascade: true })
  answers: Answer[];

  @Column({ nullable: true })
  respondentEmail?: string; // optional

  @Column({ nullable: true })
  respondentName?: string; // optional

   @Column("json", { nullable: true })
  metadata?: any;  // ← ADD THIS
  
  @CreateDateColumn()
  createdAt: Date;
}
