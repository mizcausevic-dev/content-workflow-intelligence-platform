import type {
  Approval,
  Author,
  ContentItem,
  PerformanceSignal,
  PublishingBlocker,
  WorkflowQueue,
} from "./types.js";

export const contentItems: ContentItem[] = [
  {
    id: "content_01",
    title: "Enterprise SEO Governance Platform",
    authorId: "author_01",
    stage: "legal-review",
    daysInStage: 9,
    requiredApprovalsPending: 2,
    blockingIssues: ["missing-schema-review", "legal-copy-approval"],
    searchOpportunityScore: 84,
    businessPriority: "high",
    wordCount: 1180,
    channel: "landing-page",
  },
  {
    id: "content_02",
    title: "Cloud Cost Governance Playbook",
    authorId: "author_02",
    stage: "seo-review",
    daysInStage: 3,
    requiredApprovalsPending: 1,
    blockingIssues: [],
    searchOpportunityScore: 77,
    businessPriority: "high",
    wordCount: 1420,
    channel: "resource-center",
  },
  {
    id: "content_03",
    title: "Revenue Ops Workflow Automation Guide",
    authorId: "author_03",
    stage: "ready-to-publish",
    daysInStage: 1,
    requiredApprovalsPending: 0,
    blockingIssues: [],
    searchOpportunityScore: 68,
    businessPriority: "medium",
    wordCount: 960,
    channel: "blog",
  }
];

export const authors: Author[] = [
  {
    id: "author_01",
    name: "Ariana Mills",
    team: "Content Strategy",
    activeItems: 4,
    specialty: "Platform and governance narratives",
  },
  {
    id: "author_02",
    name: "Victor Chen",
    team: "Growth Marketing",
    activeItems: 3,
    specialty: "Performance content and acquisition systems",
  },
  {
    id: "author_03",
    name: "Leah Foster",
    team: "Revenue Operations",
    activeItems: 2,
    specialty: "Operational playbooks and enablement",
  }
];

export const workflowQueues: WorkflowQueue[] = [
  {
    id: "queue_01",
    name: "Legal review queue",
    ownerTeam: "Legal",
    queuedItems: 6,
    averageDaysOpen: 7,
  },
  {
    id: "queue_02",
    name: "Schema governance queue",
    ownerTeam: "Web Platform",
    queuedItems: 4,
    averageDaysOpen: 5,
  },
  {
    id: "queue_03",
    name: "Editorial approval queue",
    ownerTeam: "Editorial",
    queuedItems: 3,
    averageDaysOpen: 2,
  }
];

export const approvals: Approval[] = [
  {
    id: "approval_01",
    contentId: "content_01",
    approverTeam: "Legal",
    status: "pending",
    dueInDays: 1,
  },
  {
    id: "approval_02",
    contentId: "content_01",
    approverTeam: "Web Platform",
    status: "pending",
    dueInDays: 2,
  },
  {
    id: "approval_03",
    contentId: "content_02",
    approverTeam: "SEO",
    status: "pending",
    dueInDays: 1,
  },
  {
    id: "approval_04",
    contentId: "content_03",
    approverTeam: "Editorial",
    status: "approved",
    dueInDays: 0,
  }
];

export const publishingBlockers: PublishingBlocker[] = [
  {
    id: "blocker_01",
    contentId: "content_01",
    blockerType: "missing-schema-review",
    severity: "high",
    ownerTeam: "Web Platform",
  },
  {
    id: "blocker_02",
    contentId: "content_01",
    blockerType: "legal-copy-approval",
    severity: "high",
    ownerTeam: "Legal",
  },
  {
    id: "blocker_03",
    contentId: "content_02",
    blockerType: "keyword-brief-alignment",
    severity: "medium",
    ownerTeam: "SEO",
  }
];

export const performanceSignals: PerformanceSignal[] = [
  {
    id: "signal_01",
    contentId: "content_01",
    metric: "search-opportunity",
    value: "84",
  },
  {
    id: "signal_02",
    contentId: "content_02",
    metric: "pipeline-influence",
    value: "high",
  },
  {
    id: "signal_03",
    contentId: "content_03",
    metric: "editorial-readiness",
    value: "ready",
  }
];
