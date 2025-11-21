import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne
} from "typeorm";
import { Question } from "./Question";

@Entity({ name: "options" })
export class Option {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Question, q => q.options, { onDelete: "CASCADE" })
  question!: Question;

  @Column()
  text!: string;

  // optionally store value separate from text
  @Column({ nullable: true })
  value?: string;
}
