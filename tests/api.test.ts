import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "Content Workflow Intelligence Platform");
});

test("GET /api/content returns an array", async () => {
  const response = await request(app).get("/api/content");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/analyze/readiness returns score and status", async () => {
  const response = await request(app).post("/api/analyze/readiness").send({
    title: "Enterprise SEO Governance Platform",
    stage: "legal-review",
    daysInStage: 9,
    requiredApprovalsPending: 2,
    blockingIssues: ["missing-schema-review", "legal-copy-approval"],
    searchOpportunityScore: 84,
    businessPriority: "high",
    wordCount: 1180,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("GET /api/queues returns an array", async () => {
  const response = await request(app).get("/api/queues");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test("POST /api/analyze/prioritization returns recommended next-step output", async () => {
  const response = await request(app).post("/api/analyze/prioritization").send({
    title: "Enterprise SEO Governance Platform",
    stage: "legal-review",
    daysInStage: 9,
    requiredApprovalsPending: 2,
    blockingIssues: ["missing-schema-review", "legal-copy-approval"],
    searchOpportunityScore: 84,
    businessPriority: "high",
    wordCount: 1180,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.priority, "string");
  assert.equal(typeof response.body.recommendedNextAction, "string");
});
