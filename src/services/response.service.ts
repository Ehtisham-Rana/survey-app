import { AppDataSource } from "../data-source";
import { Response } from "../entity/Response";
import { Answer } from "../entity/Answer";
import { Survey } from "../entity/Survey";

export class ResponseService {
  private responseRepo = AppDataSource.getRepository(Response);
  private surveyRepo = AppDataSource.getRepository(Survey);

  async submitResponse(surveyId: number, answersPayload: any[], metadata?: any) {
    const survey = await this.surveyRepo.findOne({ where: { id: surveyId } });
    if (!survey) throw new Error("Survey not found");

    const response = new Response();
    response.survey = survey;
    response.metadata = metadata || {};
    response.answers = answersPayload.map(a => {
      const ans = new Answer();
      ans.question = { id: a.questionId } as any;
      if (a.selectedOptionIds) ans.selectedOptionIds = a.selectedOptionIds;
      if (a.textAnswer) ans.textAnswer = a.textAnswer;
      return ans;
    });

    return this.responseRepo.save(response);
  }

  async getResponsesForSurvey(surveyId: number, page = 1, limit = 50) {
    return this.responseRepo.findAndCount({
      where: { survey: { id: surveyId } } as any,
      relations: ["answers", "answers.question"],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" }
    });
  }
}
