export const PRODUCT = {
  toolTitle: "Try promptgen-pro",
  ctaLabel: "Generate",
  resultLabel: "Result",
  priceMonthly: 29,
  priceYearly: 290,
  "name": "PromptGen Pro",
  "slug": "promptgen-pro",
  "tagline": "Generate production-ready AI prompts for your team",
  "description": "Describe the task — get structured prompts with variables, examples, and guardrails for ChatGPT, Claude, and APIs.",
  "features": [
    "Task-to-prompt templates",
    "Variable placeholders",
    "Team prompt library",
    "Copy & export ready"
  ],
  definitionLead: "PromptGen Pro turns a task description into production-ready AI prompts with variables, examples, and guardrails for ChatGPT, Claude, and APIs.",
  geoFaq: [
    { q: "What is PromptGen Pro?", a: "PromptGen Pro generates production-ready AI prompts with variables, examples, and guardrails." },
    { q: "What do I describe?", a: "The task you want the model to perform." },
    { q: "Which models does it target?", a: "Prompts suitable for ChatGPT, Claude, and API-style calls." },
    { q: "Does it include variables?", a: "Yes. Variable placeholders make prompts reusable." },
    { q: "Who should use it?", a: "Teams that want structured prompts instead of ad-hoc chat paste." },
    { q: "Does it replace evaluation?", a: "No. It drafts prompts; you still judge outputs for your use case." },
  ],
  systemPrompt: "You are the AI engine for promptgen-pro. Given user inputs, produce clear structured output that matches the product purpose.",
  mock: (inputs: Record<string, string>): string => {
    const lines = Object.entries(inputs || {}).map(([k, v]) => k + ': ' + v)
    return 'promptgen-pro DEMO\n\n' + (lines.join('\n') || 'No inputs') + '\n\n---\nPreview result. Add OPENAI_API_KEY for live AI.'
  },
}
