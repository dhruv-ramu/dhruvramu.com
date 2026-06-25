export type AtlasNodeType =
  | "domain"
  | "concept"
  | "question"
  | "artifact"
  | "method"
  | "book"
  | "unresolved";

export type AtlasLinkKind =
  | "project"
  | "essay"
  | "book"
  | "note"
  | "code"
  | "external";

export type AtlasNode = {
  id: string;
  label: string;
  type: AtlasNodeType;
  parent?: string;
  order?: number;
  description?: string;
  quote?: string;
  tags?: string[];
  links?: {
    label: string;
    href: string;
    kind: AtlasLinkKind;
  }[];
  related?: string[];
};

export type AtlasFilter =
  | "all"
  | "project"
  | "essay"
  | "book"
  | "method"
  | "unresolved";

export type AtlasPath = {
  id: string;
  label: string;
  nodeIds: string[];
};

export const atlasPaths: AtlasPath[] = [
  {
    id: "cancer-biology",
    label: "Cancer Biology",
    nodeIds: [
      "cancer-biology",
      "biomarkers",
      "why-biomarkers-fail",
      "false-discovery",
      "endpoint-selection",
      "clinical-utility",
      "biotech-strategy",
      "institutions",
    ],
  },
  {
    id: "biotech-strategy",
    label: "Biotech Strategy",
    nodeIds: [
      "biotech-strategy",
      "clinical-adoption",
      "diagnostics",
      "evidence-thresholds",
      "biotech-translation-essay",
      "institutions",
      "incentives",
    ],
  },
  {
    id: "research-education",
    label: "Research Education",
    nodeIds: [
      "research-education",
      "iro",
      "scientific-taste",
      "research-education-hard",
      "evaluation",
      "institutions",
      "standards",
    ],
  },
  {
    id: "philosophy",
    label: "Philosophy",
    nodeIds: [
      "books-philosophy",
      "explanation",
      "fallibilism",
      "beginning-of-infinity",
      "scientific-revolutions",
      "unresolved-taste-teachable",
      "progress",
    ],
  },
];

export const atlasNodes: AtlasNode[] = [
  // ── Level 0: Six Constellations ──
  {
    id: "cancer-biology",
    label: "Cancer Biology",
    type: "domain",
    order: 1,
    description:
      "Transcriptomics, survival modeling, biomarker discovery, and the long gap between statistical signal and clinical utility.",
    quote: "Signals are cheap. Useful signals are rare.",
  },
  {
    id: "computation",
    label: "Computation",
    type: "domain",
    order: 2,
    description:
      "Models, pipelines, statistics, and the interfaces between rigorous methods and human judgment.",
    quote: "A pipeline without documentation is a hypothesis about the past.",
  },
  {
    id: "biotech-strategy",
    label: "Biotech Strategy",
    type: "domain",
    order: 3,
    description:
      "Translating scientific truth into clinical usefulness, operational feasibility, and economic reality.",
    quote: "Strategy is translation between languages that do not share grammar.",
  },
  {
    id: "research-education",
    label: "Research Education",
    type: "domain",
    order: 4,
    description:
      "Teaching uncertainty, taste, judgment, and standards — not just methods.",
    quote: "Methods are the easy part.",
  },
  {
    id: "institutions",
    label: "Institutions",
    type: "domain",
    order: 5,
    description:
      "Incentives, governance, legibility, trust, and why some systems preserve standards while others decay.",
    quote: "Institutions encode taste whether they intend to or not.",
  },
  {
    id: "books-philosophy",
    label: "Books & Philosophy",
    type: "domain",
    order: 6,
    description:
      "Explanation, fallibilism, progress, taste, systems, and notes from reading.",
    quote: "Good explanations are hard to vary.",
  },

  // ── Cancer Biology ──
  {
    id: "transcriptomics",
    label: "Transcriptomics",
    type: "concept",
    parent: "cancer-biology",
    description: "Gene expression, normalization, and the problem of signal versus noise.",
  },
  {
    id: "gene-expression",
    label: "Gene expression",
    type: "concept",
    parent: "transcriptomics",
  },
  {
    id: "tcga",
    label: "TCGA",
    type: "concept",
    parent: "transcriptomics",
    links: [
      {
        label: "Project: TCGA Survival Analysis",
        href: "/projects/tcga-survival-analysis",
        kind: "project",
      },
    ],
  },
  {
    id: "normalization",
    label: "Normalization",
    type: "method",
    parent: "transcriptomics",
  },
  {
    id: "signal-vs-noise",
    label: "Signal vs noise",
    type: "question",
    parent: "transcriptomics",
    quote: "Most expression differences are not biology.",
  },
  {
    id: "survival-analysis",
    label: "Survival Analysis",
    type: "concept",
    parent: "cancer-biology",
    description: "Kaplan–Meier, CoxPH, and the blunt instruments of survival endpoints.",
  },
  {
    id: "kaplan-meier",
    label: "Kaplan–Meier",
    type: "method",
    parent: "survival-analysis",
  },
  {
    id: "coxph",
    label: "CoxPH",
    type: "method",
    parent: "survival-analysis",
    links: [
      {
        label: "Project: TCGA Survival Analysis",
        href: "/projects/tcga-survival-analysis",
        kind: "project",
      },
    ],
  },
  {
    id: "endpoint-selection",
    label: "Endpoint selection",
    type: "question",
    parent: "survival-analysis",
    description:
      "OS, DSS, and PFI measure different things — and conflating them corrupts biomarker discovery.",
    quote: "The endpoint defines the question.",
    related: ["os-endpoints", "dss-endpoints", "pfi-endpoints"],
  },
  {
    id: "os-endpoints",
    label: "OS",
    type: "concept",
    parent: "endpoint-selection",
  },
  {
    id: "dss-endpoints",
    label: "DSS",
    type: "concept",
    parent: "endpoint-selection",
  },
  {
    id: "pfi-endpoints",
    label: "PFI",
    type: "concept",
    parent: "endpoint-selection",
  },
  {
    id: "biomarkers",
    label: "Biomarkers",
    type: "concept",
    parent: "cancer-biology",
    description:
      "The uncomfortable distance between statistical significance and biological meaning.",
    quote: "A statistical signal is not yet a biological explanation.",
  },
  {
    id: "why-biomarkers-fail",
    label: "Why biomarkers fail",
    type: "question",
    parent: "biomarkers",
    description:
      "A statistical signal is not yet a biological explanation, and a biological explanation is not yet a clinical tool.",
    quote: "Signals are cheap. Useful signals are rare.",
    links: [
      {
        label: "Essay: Why Biomarkers Fail",
        href: "/writing/why-biomarkers-fail",
        kind: "essay",
      },
      {
        label: "Project: TCGA Survival Analysis",
        href: "/projects/tcga-survival-analysis",
        kind: "project",
      },
    ],
    related: ["false-discovery", "endpoint-selection", "clinical-utility"],
  },
  {
    id: "false-discovery",
    label: "False discovery",
    type: "concept",
    parent: "biomarkers",
    description: "Multiple testing, p-hacking, and the replication crisis in oncology biomarkers.",
  },
  {
    id: "endpoint-mismatch",
    label: "Endpoint mismatch",
    type: "concept",
    parent: "biomarkers",
  },
  {
    id: "biological-plausibility",
    label: "Biological plausibility",
    type: "question",
    parent: "biomarkers",
    quote: "Does the mechanism story survive contact with pathway biology?",
  },
  {
    id: "clinical-utility",
    label: "Clinical utility",
    type: "question",
    parent: "biomarkers",
    description: "When does a biomarker actually change a clinical decision?",
    related: ["unresolved-clinical-actionable"],
  },
  {
    id: "variant-interpretation",
    label: "Variant Interpretation",
    type: "concept",
    parent: "cancer-biology",
    description: "Annotation pipelines, evidence levels, and the politics of clinical knowledgebases.",
  },
  {
    id: "annotation-pipelines",
    label: "Annotation pipelines",
    type: "concept",
    parent: "variant-interpretation",
    links: [
      {
        label: "Project: TCGA Survival Analysis",
        href: "/projects/tcga-survival-analysis",
        kind: "project",
      },
    ],
  },
  {
    id: "evidence-levels",
    label: "Evidence levels",
    type: "concept",
    parent: "variant-interpretation",
  },
  {
    id: "restricted-knowledgebases",
    label: "Restricted knowledgebases",
    type: "concept",
    parent: "variant-interpretation",
  },
  {
    id: "interpretability",
    label: "Interpretability",
    type: "question",
    parent: "variant-interpretation",
    quote: "Black-box annotations erode the judgment clinical genomics requires.",
  },
  {
    id: "clinical-translation",
    label: "Clinical Translation",
    type: "concept",
    parent: "cancer-biology",
    description: "Assay feasibility, clinical workflow, regulatory path, and adoption failure.",
  },
  {
    id: "assay-feasibility",
    label: "Assay feasibility",
    type: "concept",
    parent: "clinical-translation",
  },
  {
    id: "clinical-workflow",
    label: "Clinical workflow",
    type: "concept",
    parent: "clinical-translation",
  },
  {
    id: "regulatory-path",
    label: "Regulatory path",
    type: "concept",
    parent: "clinical-translation",
  },
  {
    id: "adoption-failure",
    label: "Adoption failure",
    type: "question",
    parent: "clinical-translation",
    quote: "The best assay in the world fails if the workflow cannot absorb it.",
  },

  // ── Computation ──
  {
    id: "models",
    label: "Models",
    type: "concept",
    parent: "computation",
    description: "Transformers, sequence design, and when optimization becomes overfitting.",
  },
  {
    id: "transformers",
    label: "Transformers",
    type: "method",
    parent: "models",
    links: [
      {
        label: "Project: CHOFormer",
        href: "/projects/choformer",
        kind: "project",
      },
    ],
  },
  {
    id: "codon-optimization",
    label: "Codon optimization",
    type: "concept",
    parent: "models",
    links: [
      {
        label: "Project: CHOFormer",
        href: "/projects/choformer",
        kind: "project",
      },
    ],
  },
  {
    id: "sequence-design",
    label: "Sequence design",
    type: "concept",
    parent: "models",
  },
  {
    id: "model-evaluation",
    label: "Model evaluation",
    type: "question",
    parent: "models",
    related: ["unresolved-overfitting"],
  },
  {
    id: "pipelines",
    label: "Pipelines",
    type: "concept",
    parent: "computation",
    description: "Reproducibility, automation, and documentation as epistemic commitments.",
  },
  {
    id: "reproducibility",
    label: "Reproducibility",
    type: "concept",
    parent: "pipelines",
  },
  {
    id: "data-cleaning",
    label: "Data cleaning",
    type: "method",
    parent: "pipelines",
  },
  {
    id: "automation",
    label: "Automation",
    type: "method",
    parent: "pipelines",
  },
  {
    id: "documentation",
    label: "Documentation",
    type: "concept",
    parent: "pipelines",
    quote: "Undocumented code is a claim without evidence.",
  },
  {
    id: "statistics",
    label: "Statistics",
    type: "concept",
    parent: "computation",
    description: "Uncertainty, multiple testing, effect size, and validation.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    type: "concept",
    parent: "statistics",
    related: ["unresolved-uncertainty-tolerance"],
  },
  {
    id: "multiple-testing",
    label: "Multiple testing",
    type: "method",
    parent: "statistics",
  },
  {
    id: "effect-size",
    label: "Effect size",
    type: "concept",
    parent: "statistics",
  },
  {
    id: "validation",
    label: "Validation",
    type: "question",
    parent: "statistics",
    quote: "Replication is not a courtesy. It is the method.",
  },
  {
    id: "interfaces",
    label: "Interfaces",
    type: "concept",
    parent: "computation",
    description: "Dashboards, explainability, and tools that preserve human judgment.",
  },
  {
    id: "dashboards",
    label: "Dashboards",
    type: "concept",
    parent: "interfaces",
    links: [
      {
        label: "Project: International Research Olympiad",
        href: "/projects/international-research-olympiad",
        kind: "project",
      },
    ],
  },
  {
    id: "explainability",
    label: "Explainability",
    type: "question",
    parent: "interfaces",
  },
  {
    id: "research-tools",
    label: "Research tools",
    type: "concept",
    parent: "interfaces",
  },
  {
    id: "human-judgment",
    label: "Human judgment",
    type: "concept",
    parent: "interfaces",
    quote: "Tools should augment judgment, not replace it.",
  },
  {
    id: "vision-display",
    label: "Vision-correcting display",
    type: "artifact",
    parent: "interfaces",
    links: [
      {
        label: "Project: Vision-Correcting Display",
        href: "/projects/vision-correcting-display",
        kind: "project",
      },
    ],
  },

  // ── Biotech Strategy ──
  {
    id: "clinical-adoption",
    label: "Clinical Adoption",
    type: "concept",
    parent: "biotech-strategy",
    description: "Workflow fit, reimbursement, physician trust, and operational drag.",
  },
  {
    id: "workflow-fit",
    label: "Workflow fit",
    type: "concept",
    parent: "clinical-adoption",
  },
  {
    id: "reimbursement",
    label: "Reimbursement",
    type: "concept",
    parent: "clinical-adoption",
  },
  {
    id: "physician-trust",
    label: "Physician trust",
    type: "question",
    parent: "clinical-adoption",
  },
  {
    id: "operational-drag",
    label: "Operational drag",
    type: "concept",
    parent: "clinical-adoption",
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    type: "concept",
    parent: "biotech-strategy",
    description: "Sample logistics, assay economics, regulatory claims, and evidence thresholds.",
  },
  {
    id: "sample-logistics",
    label: "Sample logistics",
    type: "concept",
    parent: "diagnostics",
  },
  {
    id: "assay-economics",
    label: "Assay economics",
    type: "concept",
    parent: "diagnostics",
  },
  {
    id: "regulatory-claims",
    label: "Regulatory claims",
    type: "concept",
    parent: "diagnostics",
  },
  {
    id: "evidence-thresholds",
    label: "Evidence thresholds",
    type: "question",
    parent: "diagnostics",
    quote: "How much evidence is enough to change practice?",
  },
  {
    id: "hospitals",
    label: "Hospitals",
    type: "concept",
    parent: "biotech-strategy",
    description: "Oncology access, care pathways, patient navigation, and technology evaluation.",
  },
  {
    id: "oncology-access",
    label: "Oncology access",
    type: "concept",
    parent: "hospitals",
  },
  {
    id: "care-pathways",
    label: "Care pathways",
    type: "concept",
    parent: "hospitals",
  },
  {
    id: "patient-navigation",
    label: "Patient navigation",
    type: "concept",
    parent: "hospitals",
  },
  {
    id: "markets",
    label: "Markets",
    type: "concept",
    parent: "biotech-strategy",
    description: "Go-to-market, stakeholder incentives, pricing, and category creation.",
  },
  {
    id: "go-to-market",
    label: "Go-to-market",
    type: "concept",
    parent: "markets",
  },
  {
    id: "stakeholder-incentives",
    label: "Stakeholder incentives",
    type: "concept",
    parent: "markets",
    related: ["incentives"],
  },
  {
    id: "pricing",
    label: "Pricing",
    type: "concept",
    parent: "markets",
  },
  {
    id: "biotech-translation-essay",
    label: "Biotech strategy as translation",
    type: "artifact",
    parent: "biotech-strategy",
    links: [
      {
        label: "Essay: Biotech Strategy as Translation",
        href: "/writing/biotech-strategy-as-translation",
        kind: "essay",
      },
    ],
  },

  // ── Research Education ──
  {
    id: "iro",
    label: "IRO",
    type: "concept",
    parent: "research-education",
    description:
      "Exam design, scoring models, oral defense, integrity analytics, and global access.",
    links: [
      {
        label: "Project: International Research Olympiad",
        href: "/projects/international-research-olympiad",
        kind: "project",
      },
    ],
  },
  {
    id: "exam-design",
    label: "Exam design",
    type: "concept",
    parent: "iro",
  },
  {
    id: "scoring-models",
    label: "Scoring models",
    type: "method",
    parent: "iro",
  },
  {
    id: "oral-defense",
    label: "Oral defense",
    type: "concept",
    parent: "iro",
  },
  {
    id: "integrity-analytics",
    label: "Integrity analytics",
    type: "method",
    parent: "iro",
  },
  {
    id: "global-access",
    label: "Global access",
    type: "question",
    parent: "iro",
  },
  {
    id: "scientific-taste",
    label: "Scientific Taste",
    type: "concept",
    parent: "research-education",
    description: "Question selection, standards, uncertainty, and intellectual honesty.",
    related: ["unresolved-taste-teachable"],
  },
  {
    id: "question-selection",
    label: "Question selection",
    type: "question",
    parent: "scientific-taste",
    links: [
      {
        label: "Essay: Notes on Building Serious Things",
        href: "/writing/notes-on-building-serious-things",
        kind: "essay",
      },
    ],
  },
  {
    id: "standards",
    label: "Standards",
    type: "concept",
    parent: "scientific-taste",
  },
  {
    id: "intellectual-honesty",
    label: "Intellectual honesty",
    type: "concept",
    parent: "scientific-taste",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    type: "concept",
    parent: "research-education",
    description: "Rubrics, hard questions, reasoning quality, and signal detection.",
  },
  {
    id: "rubrics",
    label: "Rubrics",
    type: "method",
    parent: "evaluation",
  },
  {
    id: "hard-questions",
    label: "Hard questions",
    type: "concept",
    parent: "evaluation",
  },
  {
    id: "reasoning-quality",
    label: "Reasoning quality",
    type: "concept",
    parent: "evaluation",
  },
  {
    id: "research-education-hard",
    label: "What makes research education hard",
    type: "artifact",
    parent: "research-education",
    links: [
      {
        label: "Essay: What Makes Research Education Hard",
        href: "/writing/what-makes-research-education-hard",
        kind: "essay",
      },
    ],
  },
  {
    id: "competition-design",
    label: "Competition design",
    type: "concept",
    parent: "research-education",
    related: ["institutions"],
  },

  // ── Institutions ──
  {
    id: "incentives",
    label: "Incentives",
    type: "concept",
    parent: "institutions",
    description: "What gets rewarded shapes what gets built.",
    links: [
      {
        label: "Essay: Notes on Building Serious Things",
        href: "/writing/notes-on-building-serious-things",
        kind: "essay",
      },
    ],
  },
  {
    id: "governance",
    label: "Governance",
    type: "concept",
    parent: "institutions",
  },
  {
    id: "legibility",
    label: "Legibility",
    type: "concept",
    parent: "institutions",
    quote: "Systems that cannot be understood cannot be improved.",
  },
  {
    id: "trust",
    label: "Trust",
    type: "concept",
    parent: "institutions",
  },
  {
    id: "failure-modes",
    label: "Failure modes",
    type: "concept",
    parent: "institutions",
    related: ["unresolved-institutions-decay"],
  },
  {
    id: "institutional-standards",
    label: "Standards",
    type: "concept",
    parent: "institutions",
  },

  // ── Books & Philosophy ──
  {
    id: "explanation",
    label: "Explanation",
    type: "concept",
    parent: "books-philosophy",
    description: "Good explanations are hard to vary.",
    links: [
      {
        label: "Book: The Beginning of Infinity",
        href: "/library",
        kind: "book",
      },
      {
        label: "Essay: Review of The Beginning of Infinity",
        href: "/writing/book-review-beginning-of-infinity",
        kind: "essay",
      },
    ],
  },
  {
    id: "fallibilism",
    label: "Fallibilism",
    type: "concept",
    parent: "books-philosophy",
    quote: "We can be wrong about everything and still make progress.",
  },
  {
    id: "beginning-of-infinity",
    label: "The Beginning of Infinity",
    type: "book",
    parent: "explanation",
    links: [
      {
        label: "Review: The Beginning of Infinity",
        href: "/writing/book-review-beginning-of-infinity",
        kind: "essay",
      },
      {
        label: "Library entry",
        href: "/library",
        kind: "book",
      },
    ],
  },
  {
    id: "scientific-revolutions",
    label: "Scientific revolutions",
    type: "concept",
    parent: "books-philosophy",
    links: [
      {
        label: "Book: Structure of Scientific Revolutions",
        href: "/library",
        kind: "book",
      },
    ],
  },
  {
    id: "progress",
    label: "Progress",
    type: "question",
    parent: "books-philosophy",
    quote: "Problems are inevitable. Problems are soluble.",
  },
  {
    id: "taste",
    label: "Taste",
    type: "concept",
    parent: "books-philosophy",
    related: ["unresolved-taste-teachable", "scientific-taste"],
  },
  {
    id: "systems",
    label: "Systems",
    type: "concept",
    parent: "books-philosophy",
  },
  {
    id: "human-agency",
    label: "Human agency",
    type: "concept",
    parent: "books-philosophy",
  },
  {
    id: "reading-notes",
    label: "Notes from reading",
    type: "concept",
    parent: "books-philosophy",
    links: [
      {
        label: "Library",
        href: "/library",
        kind: "book",
      },
    ],
  },

  // ── Unresolved Questions ──
  {
    id: "unresolved-signals-filtering",
    label: "Why do weak scientific signals survive institutional filtering?",
    type: "unresolved",
    parent: "institutions",
    description: "A live question about incentive structures and evidence standards.",
    related: ["false-discovery", "incentives", "failure-modes"],
  },
  {
    id: "unresolved-taste-teachable",
    label: "Can research taste be taught?",
    type: "unresolved",
    parent: "scientific-taste",
    description:
      "Taste may be learnable through exposure and feedback, but not through instruction alone.",
    related: ["scientific-taste", "evaluation", "taste"],
  },
  {
    id: "unresolved-clinical-actionable",
    label: "What makes a biological explanation clinically actionable?",
    type: "unresolved",
    parent: "clinical-utility",
    description:
      "The gap between mechanism and decision remains poorly theorized.",
    related: ["clinical-utility", "biological-plausibility", "clinical-translation"],
  },
  {
    id: "unresolved-overfitting",
    label: "When does optimization become overfitting disguised as progress?",
    type: "unresolved",
    parent: "model-evaluation",
    description: "Especially salient in sequence models and biomarker discovery.",
    related: ["model-evaluation", "validation", "false-discovery"],
  },
  {
    id: "unresolved-institutions-decay",
    label: "Why do some institutions preserve standards while others decay?",
    type: "unresolved",
    parent: "failure-modes",
    description: "A question about governance, incentives, and cultural transmission.",
    related: ["institutions", "incentives", "governance", "trust"],
  },
  {
    id: "unresolved-uncertainty-tolerance",
    label: "How much uncertainty can a decision tolerate?",
    type: "unresolved",
    parent: "uncertainty",
    description:
      "Different domains — clinical, strategic, educational — answer this differently.",
    related: ["uncertainty", "clinical-utility", "evidence-thresholds"],
  },
];

// ── Helpers ──

const nodeMap = new Map(atlasNodes.map((n) => [n.id, n]));

export function getAtlasNode(id: string): AtlasNode | undefined {
  return nodeMap.get(id);
}

export function getRootNodes(): AtlasNode[] {
  return atlasNodes
    .filter((n) => n.type === "domain")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getChildNodes(parentId: string): AtlasNode[] {
  return atlasNodes.filter((n) => n.parent === parentId);
}

export function getAncestors(id: string): AtlasNode[] {
  const ancestors: AtlasNode[] = [];
  let current = nodeMap.get(id);
  while (current?.parent) {
    const parent = nodeMap.get(current.parent);
    if (!parent) break;
    ancestors.unshift(parent);
    current = parent;
  }
  return ancestors;
}

export function getBreadcrumb(id: string): AtlasNode[] {
  const node = nodeMap.get(id);
  if (!node) return [];
  return [...getAncestors(id), node];
}

export function nodeMatchesFilter(node: AtlasNode, filter: AtlasFilter): boolean {
  if (filter === "all") return true;
  if (filter === "unresolved") return node.type === "unresolved";
  if (filter === "method") return node.type === "method" || node.type === "concept";
  if (filter === "project")
    return node.links?.some((l) => l.kind === "project") ?? false;
  if (filter === "essay")
    return node.links?.some((l) => l.kind === "essay") ?? false;
  if (filter === "book")
    return (
      node.type === "book" ||
      (node.links?.some((l) => l.kind === "book") ?? false)
    );
  return true;
}

export function getDescendantIds(id: string): string[] {
  const children = getChildNodes(id);
  return [
    id,
    ...children.flatMap((c) => getDescendantIds(c.id)),
  ];
}

export const ROOT_IDS = getRootNodes().map((n) => n.id);

function countLinked(kind: AtlasLinkKind) {
  return atlasNodes.filter((n) => n.links?.some((l) => l.kind === kind)).length;
}

export const atlasStats = {
  constellations: atlasNodes.filter((n) => n.type === "domain").length,
  nodes: atlasNodes.length,
  writings: countLinked("essay"),
  projects: countLinked("project"),
};
