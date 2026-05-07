import { Router } from "express";
import { approvals } from "../services/workflowService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(approvals);
});

export default router;
