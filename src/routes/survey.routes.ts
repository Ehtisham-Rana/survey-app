import express from "express";
import { SurveyController } from "../controllers/survey.controller";
import { ResponseController } from "../controllers/response.controller";
import { authenticate } from "../middleware/auth.middleware"; // protect routes
import { validateDTO } from "../middleware/validation.middleware";
import { CreateSurveyDTO } from "../dto/createSurvey.dto";

const router = express.Router();

// create & manage (authenticated)
router.post(
  "/surveys",
  authenticate, 
  validateDTO(CreateSurveyDTO),  // <-- validate input
  SurveyController.create
);

router.get("/surveys/me", authenticate, SurveyController.listByOwner);
router.get("/surveys/:id", SurveyController.get); // public to fetch survey for filling

// responses (public endpoint to submit)
router.post("/surveys/:surveyId/responses", ResponseController.submit);
router.get("/surveys/:surveyId/responses", authenticate, ResponseController.list); // owner-only in middleware optionally


export { router as surveyRouter };