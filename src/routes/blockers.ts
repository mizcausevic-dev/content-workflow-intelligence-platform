import { Router } from "express";
import { publishingBlockers } from "../services/workflowService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(publishingBlockers);
});

export default router;
