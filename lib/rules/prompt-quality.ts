export const RULESET_ID = 'prompt-quality'
export const RULESET_VERSION = '1.0.0'

export type RuleHit = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  remediation?: string
  ref?: string
}

export function runAllRules(blob: string): Array<Record<string, unknown>> {
  const text = String(blob || '')
  const hits: Array<Record<string, unknown>> = []
  hits.push({
    id: 'PG-A01',
    name: 'Task clarity',
    severity: 'medium',
    passed: text.trim().length >= 12,
    message: 'Describe the task in at least a short sentence.',
    ref: 'https://platform.openai.com/docs/guides/prompt-engineering',
  })
  hits.push({
    id: 'PG-A02',
    name: 'No secret leakage ask',
    severity: 'high',
    passed: !/api[_-]?key|password|secret/i.test(text),
    message: 'Do not ask the model to invent or echo live secrets.',
    ref: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
  })
  return hits
}

export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r) => ({
    id: String(r.id || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: String(r.message || r.remediation || ''),
    ref: r.ref ? String(r.ref) : undefined,
  }))
}
