import { Request, Response } from "express";
import { ResponseService } from "../services/response.service";

const responseService = new ResponseService();

export class ResponseController {
  static async submit(req: Request, res: Response) {
    try {
      const surveyId = Number(req.params.surveyId);
      const answers = req.body.answers;
      const metadata = { ip: req.ip, ua: req.headers["user-agent"] };
      const saved = await responseService.submitResponse(surveyId, answers, metadata);
      return res.status(201).json({ success: true, responseId: saved.id });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const surveyId = Number(req.params.surveyId);
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 50);
      const [items, total] = await responseService.getResponsesForSurvey(surveyId, page, limit);
      return res.json({ items, total });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}
