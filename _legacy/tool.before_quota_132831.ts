import type { NextApiRequest, NextApiResponse } from 'next'
import { PRODUCT } from '../lib/product'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const inputs = (req.body && req.body.inputs) || {}
  const topic = String(inputs.topic || inputs.text || '').trim() || 'your goal'
  const mock =
    typeof (PRODUCT as any).mock === 'function'
      ? (PRODUCT as any).mock(inputs)
      : `${PRODUCT.name} DEMO\n\nInput: ${topic}\n\n---\nPreview result. Upgrade for full runs.`
  return res.status(200).json({ result: mock, mock: true, degraded: true })
}
