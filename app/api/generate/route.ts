import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
})

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { task, context, model, variations } = body

    if (!task) {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      )
    }

    // 生成优化提示词
    const promptGenerationPrompt = `You are an expert prompt engineer. Generate an optimized prompt for the following task.

Task: ${task}
${context ? `Context: ${context}` : ''}
${model ? `Target Model: ${model}` : ''}

Return JSON with:
- optimized_prompt: the optimized prompt text
- reasoning: why this prompt works well
- tips: array of 2-3 tips for further improvement`

    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o',
      messages: [
        { role: 'system', content: promptGenerationPrompt },
        { role: 'user', content: `Generate optimized prompt for: ${task}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')

    // 如果请求多个变体
    if (variations && variations > 1) {
      const variationPrompts = []
      for (let i = 0; i < variations; i++) {
        const varResponse = await openai.chat.completions.create({
          model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o',
          messages: [
            { role: 'system', content: 'Generate a variation of the prompt with a different approach.' },
            { role: 'user', content: `Original task: ${task}\n\nGenerate variation ${i + 1}` }
          ],
          temperature: 0.8,
        })
        variationPrompts.push(varResponse.choices[0].message.content)
      }
      result.variations = variationPrompts
    }

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    })

  } catch (error: any) {
    console.error('Prompt generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate prompt', details: error.message },
      { status: 500 }
    )
  }
}
