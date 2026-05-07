import { Router } from "express";
import { contentItems } from "../services/workflowService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(contentItems);
});

router.get("/:id", (request, response) => {
  const item = contentItems.find((entry) => entry.id === request.params.id);

  if (!item) {
    return response.status(404).json({
      error: "Not Found",
      message: "Content item was not found.",
    });
  }

  return response.json(item);
});

export default router;
