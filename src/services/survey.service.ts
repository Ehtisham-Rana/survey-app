import { AppDataSource } from "../data-source";
import { Survey } from "../entity/Survey";
import { Question } from "../entity/Question";
import { Option } from "../entity/Option";
import { User } from "../entity/User";

export class SurveyService {
  private surveyRepo = AppDataSource.getRepository(Survey);

  async createSurvey(owner: User, payload: any) {
    // Build entity with questions & options, use cascade save
    const survey = new Survey();
    survey.title = payload.title;
    survey.description = payload.description;
    survey.owner = owner;
    survey.isActive = payload.isActive ?? true;
    survey.questions = (payload.questions || []).map((q: any) => {
      const question = new Question();
      question.text = q.text;
      question.type = q.type;
      question.meta = q.meta || null;
      if (q.options && q.options.length) {
        question.options = q.options.map((o: any) => {
          const option = new Option();
          option.text = o.text;
          option.value = o.value ?? o.text;
          return option;
        });
      }
      return question;
    });

    return this.surveyRepo.save(survey);
  }

  async findById(id: number) {
    return this.surveyRepo.findOne({
      where: { id },
      relations: ["questions", "questions.options", "owner"]
    });
  }

  async findByOwner(ownerId: number, page = 1, limit = 20) {
    const [items, total] = await this.surveyRepo.findAndCount({
      where: { owner: { id: ownerId } } as any,
      relations: ["questions"],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" }
    });
    return { items, total };
  }

  async deleteSurvey(surveyId: number, ownerId: number) {
    // check owner and delete
    const survey = await this.findById(surveyId);
    if (!survey) throw new Error("Not found");
    if (survey.owner.id !== ownerId) throw new Error("Forbidden");
    return this.surveyRepo.remove(survey);
  }
}
