export type ContentStage =
  | "draft"
  | "seo-review"
  | "legal-review"
  | "editorial-review"
  | "ready-to-publish"
  | "published";

export type WorkflowStatus = "ready" | "needs-review" | "blocked";
export type BusinessPriority = "low" | "medium" | "high";

export interface ContentItem {
  id: string;
  title: string;
  authorId: string;
  stage: ContentStage;
  daysInStage: number;
  requiredApprovalsPending: number;
  blockingIssues: string[];
  searchOpportunityScore: number;
  businessPriority: BusinessPriority;
  wordCount: number;
  channel: "blog" | "landing-page" | "resource-center";
}

export interface Author {
  id: string;
  name: string;
  team: string;
  activeItems: number;
  specialty: string;
}

export interface WorkflowQueue {
  id: string;
  name: string;
  ownerTeam: string;
  queuedItems: number;
  averageDaysOpen: number;
}

export interface Approval {
  id: string;
  contentId: string;
  approverTeam: string;
  status: "pending" | "approved";
  dueInDays: number;
}

export interface PublishingBlocker {
  id: string;
  contentId: string;
  blockerType: string;
  severity: "low" | "medium" | "high";
  ownerTeam: string;
}

export interface PerformanceSignal {
  id: string;
  contentId: string;
  metric: string;
  value: string;
}

export interface AnalysisInput {
  title: string;
  stage: ContentStage;
  daysInStage: number;
  requiredApprovalsPending: number;
  blockingIssues: string[];
  searchOpportunityScore: number;
  businessPriority: BusinessPriority;
  wordCount: number;
}

export interface AnalysisResponse {
  status: WorkflowStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface PrioritizationResponse {
  priority: "medium" | "high" | "critical";
  rationale: string[];
  recommendedNextAction: string;
}
