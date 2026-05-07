import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import contentRouter from "./routes/content.js";
import authorsRouter from "./routes/authors.js";
import approvalsRouter from "./routes/approvals.js";
import blockersRouter from "./routes/blockers.js";
import dashboardRouter from "./routes/dashboard.js";
import healthRouter from "./routes/health.js";
import queuesRouter from "./routes/queues.js";
import analysisRouter from "./routes/analysis.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const docsPath = path.join(process.cwd(), "docs", "openapi.yaml");
const openApiDocument = yaml.load(
  fs.readFileSync(docsPath, "utf8"),
) as Parameters<typeof swaggerUi.setup>[0];

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/health", healthRouter);
app.use("/api/content", contentRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/queues", queuesRouter);
app.use("/api/approvals", approvalsRouter);
app.use("/api/blockers", blockersRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", analysisRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
