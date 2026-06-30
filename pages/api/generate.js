export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, scenario } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt description is required' })
  }

  try {
    // Mock AI generation (replace with actual OpenAI call)
    const generated = {
      original: prompt,
      scenario,
      generatedPrompt: `You are a helpful assistant. ${prompt}\n\nPlease provide a detailed response considering the following:\n1. Be specific and actionable\n2. Use examples where possible\n3. Consider edge cases`,
      tips: [
        'Add context for better results',
        'Specify output format',
        'Include constraints',
      ],
    }

    res.status(200).json(generated)
  } catch (error) {
    console.error('Generation error:', error)
    res.status(500).json({ error: error.message })
  }
}
