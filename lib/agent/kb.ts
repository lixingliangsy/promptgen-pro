import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What PromptGen Pro does",
    keywords: ["PromptGen Pro", "promptgen-pro", "what", "product", "about", "Generate production-ready AI prompts for your team"],
    body: "Generate production-ready AI prompts for your team. PromptGen Pro turns a task description into production-ready AI prompts with variables, examples, and guardrails for ChatGPT, Claude, and APIs.",
    source: "PromptGen Pro product definition",
    tags: [],
  },
  {
    id: "features",
    title: "PromptGen Pro features",
    keywords: ["features", "feature", "can", "does", "Task-to-prompt templates", "Variable placeholders", "Team prompt library", "Copy & export ready"],
    body: "PromptGen Pro includes: Task-to-prompt templates; Variable placeholders; Team prompt library; Copy & export ready. It does not add capabilities that are not listed here.",
    source: "PromptGen Pro feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "PromptGen Pro pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for PromptGen Pro: $29/month and $290/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "PromptGen Pro pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use PromptGen Pro",
    keywords: ["how", "start", "use", "tool", "run", "Try promptgen-pro"],
    body: "Open PromptGen Pro and use Try promptgen-pro.",
    source: "PromptGen Pro tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is PromptGen Pro?",
    keywords: ["What", "is", "PromptGen", "Pro?"],
    body: "PromptGen Pro generates production-ready AI prompts with variables, examples, and guardrails.",
    source: "PromptGen Pro FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What do I describe?",
    keywords: ["What", "do", "I", "describe?"],
    body: "The task you want the model to perform.",
    source: "PromptGen Pro FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Which models does it target?",
    keywords: ["Which", "models", "does", "it", "target?"],
    body: "Prompts suitable for ChatGPT, Claude, and API-style calls.",
    source: "PromptGen Pro FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about PromptGen Pro are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "PromptGen Pro support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
