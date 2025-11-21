import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from "typeorm";
import { Response } from "./Response";
import { Question } from "./Question";

@Entity({ name: "answers" })
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Response, r => r.answers, { onDelete: "CASCADE" })
  response!: Response;

  @ManyToOne(() => Question, { nullable: false })
  question!: Question;

  // For multiple choices (radio/checkbox) store selected option ids or values
  @Column({ type: "simple-array", nullable: true })
  selectedOptionIds?: number[]; // or as strings

  @Column({ type: "text", nullable: true })
  textAnswer?: string;
}



