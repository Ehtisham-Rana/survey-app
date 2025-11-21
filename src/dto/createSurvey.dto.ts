// dtos/createSurvey.dto.ts
import { IsString, IsArray, ValidateNested, IsOptional, IsIn } from "class-validator";
import { Type } from "class-transformer";

class OptionDTO {
  @IsString()              // option.text must be a string
  text: string;
}

class QuestionDTO {
  @IsString()
  text: string;

  @IsIn(["rating", "checkbox", "textarea"])  // type must be one of these
  type: string;

  @IsOptional()
  meta?: any;

  @IsOptional()
  @ValidateNested({ each: true })  // validate nested array objects
  @Type(() => OptionDTO)
  options?: OptionDTO[];
}

export class CreateSurveyDTO {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })  // validate each question object
  @Type(() => QuestionDTO)
  questions: QuestionDTO[];
}
