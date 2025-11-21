import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { Survey } from "./Survey";
import { Option } from "./Option";

export type QuestionType = "text" | "textarea" | "radio" | "checkbox" | "rating";

@Entity({ name: "questions" })
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Survey, survey => survey.questions, { onDelete: "CASCADE" })
  survey!: Survey;

  @Column()
  text!: string;

  @Column({ type: "varchar", length: 20 })
  type!: QuestionType;

  // For rating, you can store scale or min/max in JSON
  @Column({ type: "simple-json", nullable: true })
  meta?: Record<string, any>;

  @OneToMany(() => Option, option => option.question, { cascade: true })
  options!: Option[];
}
