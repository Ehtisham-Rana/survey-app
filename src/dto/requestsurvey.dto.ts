export interface CreateQuestionDto {
  text: string;
  type: "text"|"textarea"|"radio"|"checkbox"|"rating";
  options?: { text: string, value?: string }[];
  meta?: Record<string, any>;
}

export interface CreateSurveyDto {
  title: string;
  description?: string;
  questions: CreateQuestionDto[];
}
