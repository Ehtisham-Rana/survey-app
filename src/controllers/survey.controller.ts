import { Request, Response } from "express";
import { SurveyService } from "../services/survey.service";

const surveyService = new SurveyService();

export class SurveyController {
  static async create(req: Request, res: Response) {
    try {
      // assume req.user is set by auth middleware
      const owner = req.user;
      const survey = await surveyService.createSurvey(owner, req.body);
      return res.status(201).json({ success: true, survey });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const survey = await surveyService.findById(id);
      if (!survey) return res.status(404).json({ message: "Not found" });
      return res.json({ survey });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }

  static async listByOwner(req: Request, res: Response) {
    try {
      const ownerId = req.user.id;
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const result = await surveyService.findByOwner(ownerId, page, limit);
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}
