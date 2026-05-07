import { Router } from "express";
import { authors } from "../services/workflowService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(authors);
});

export default router;
