import { Router } from "express";
import { workflowQueues } from "../services/workflowService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(workflowQueues);
});

export default router;
