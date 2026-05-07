import { Router } from "express";
import { z } from "zod";
import {
  analyzeBottleneck,
  analyzePrioritization,
  analyzeReadiness,
} from "../services/workflowService.js";

const router = Router();

const analysisSchema = z.object({
  title: z.string().min(2),
  stage: z.enum([
    "draft",
    "seo-review",
    "legal-review",
    "editorial-review",
    "ready-to-publish",
    "published",
  ]),
  daysInStage: z.number().int().nonnegative(),
  requiredApprovalsPending: z.number().int().nonnegative(),
  blockingIssues: z.array(z.string()),
  searchOpportunityScore: z.number().int().min(0).max(100),
  businessPriority: z.enum(["low", "medium", "high"]),
  wordCount: z.number().int().positive(),
});

router.post("/analyze/readiness", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeReadiness(input));
});

router.post("/analyze/bottleneck", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeBottleneck(input));
});

router.post("/analyze/prioritization", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzePrioritization(input));
});

export default router;
