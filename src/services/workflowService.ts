import {
  approvals,
  authors,
  contentItems,
  performanceSignals,
  publishingBlockers,
  workflowQueues,
} from "../data.js";
import type {
  AnalysisInput,
  AnalysisResponse,
  PrioritizationResponse,
  WorkflowStatus,
} from "../types.js";

function statusFromScore(score: number): WorkflowStatus {
  if (score >= 80) {
    return "ready";
  }

  if (score >= 55) {
    return "needs-review";
  }

  return "blocked";
}

export function analyzeReadiness(input: AnalysisInput): AnalysisResponse {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 100;

  if (input.daysInStage > 5) {
    issues.push("Content has remained in the current stage beyond the expected workflow SLA.");
    score -= 18;
  } else {
    passedChecks.push("Workflow stage duration remains inside the expected editorial SLA.");
  }

  if (input.requiredApprovalsPending > 0) {
    issues.push("Required approvals are still pending.");
    score -= Math.min(20, input.requiredApprovalsPending * 8);
  } else {
    passedChecks.push("All required approvals are complete.");
  }

  if (input.blockingIssues.length > 0) {
    issues.push("Blocking governance issues remain unresolved for this content item.");
    score -= Math.min(22, input.blockingIssues.length * 9);
  } else {
    passedChecks.push("No active publishing blockers are attached to this item.");
  }

  if (input.searchOpportunityScore >= 75) {
    passedChecks.push("Search opportunity supports continued prioritization.");
  } else {
    issues.push("Search opportunity is moderate and may not justify continued queue acceleration.");
    score -= 6;
  }

  if (input.wordCount >= 900) {
    passedChecks.push("Content depth is sufficient for target topic competitiveness.");
  } else {
    issues.push("Content depth may be too thin for enterprise publishing standards.");
    score -= 12;
  }

  if (input.stage === "legal-review" && input.daysInStage > 7) {
    issues.push("Legal review is a likely throughput bottleneck for this asset.");
    score -= 10;
  }

  if (input.blockingIssues.includes("missing-schema-review")) {
    issues.push("Schema review remains unresolved for a high-priority asset.");
    score -= 10;
  }

  if (input.businessPriority === "high") {
    passedChecks.push("Business priority justifies active workflow escalation if blocked.");
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const status = statusFromScore(finalScore);
  const recommendedNextAction =
    status === "blocked"
      ? "Escalate approval path and route schema or legal review to the owning governance team this sprint."
      : status === "needs-review"
        ? "Keep the item active in queue, resolve pending approvals, and validate publishing blockers before release."
        : "Promote to publishing preparation and schedule release with final QA checks.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function analyzeBottleneck(input: AnalysisInput): AnalysisResponse {
  const result = analyzeReadiness(input);

  if (input.stage === "legal-review") {
    result.issues.push("Legal review queue is currently the dominant workflow bottleneck.");
    result.score = Math.max(0, result.score - 5);
    result.status = statusFromScore(result.score);
    result.recommendedNextAction =
      "Escalate legal review ownership, compress approval path, and protect priority content from queue drift.";
  }

  return result;
}

export function analyzePrioritization(input: AnalysisInput): PrioritizationResponse {
  const rationale: string[] = [];
  let priority: PrioritizationResponse["priority"] = "medium";

  if (input.businessPriority === "high" && input.searchOpportunityScore >= 75) {
    priority = "critical";
    rationale.push("Business priority and search opportunity both justify rapid progression.");
  }

  if (input.requiredApprovalsPending > 1 || input.blockingIssues.length > 1) {
    rationale.push("The item needs active operator intervention to prevent workflow stall.");
    if (priority === "medium") {
      priority = "high";
    }
  }

  if (input.stage === "ready-to-publish") {
    rationale.push("The item is already near release and can convert quickly with minimal operational drag.");
    if (priority !== "critical") {
      priority = "high";
    }
  }

  if (rationale.length === 0) {
    rationale.push("The item should remain in the standard queue without executive escalation.");
  }

  const recommendedNextAction =
    priority === "critical"
      ? "Escalate the approval chain, route blockers to the owning governance team, and protect publishing priority this week."
      : priority === "high"
        ? "Advance the item with active queue management and close remaining blockers this sprint."
        : "Keep the item in normal editorial flow and reassess after the next review cycle.";

  return {
    priority,
    rationale,
    recommendedNextAction,
  };
}

export function getDashboardSummary() {
  const blockedItems = contentItems.filter((item) => item.blockingIssues.length > 0).length;
  const readyItems = contentItems.filter((item) => item.stage === "ready-to-publish").length;
  const pendingApprovals = approvals.filter((approval) => approval.status === "pending").length;

  return {
    contentCount: contentItems.length,
    authorCount: authors.length,
    blockedItemCount: blockedItems,
    readyToPublishCount: readyItems,
    pendingApprovalCount: pendingApprovals,
    topOperationalRisks: [
      "Legal review queue latency",
      "Schema governance bottlenecks on priority landing pages",
      "Approval-path friction across editorial and platform teams",
    ],
    queueHealth: workflowQueues,
    signalCoverage: performanceSignals.length,
  };
}

export {
  approvals,
  authors,
  contentItems,
  performanceSignals,
  publishingBlockers,
  workflowQueues,
};
