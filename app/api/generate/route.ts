import { type NextRequest, NextResponse } from 'next/server';

// Mock 数据（无 API Key 时使用）
const MOCK_RESULT = {
  optimized_prompt: `You are an expert software engineer.

CONTEXT
- User is asking about: [USER_TASK_HERE]
- Provide clear, actionable guidance
- Include code examples when helpful

INSTRUCTIONS
1. Analyze the user's requirement carefully
2. Provide step-by-step solution
3. Include best practices and common pitfalls
4. Add working code examples (when applicable)
5. Suggest next steps for deeper learning

OUTPUT FORMAT
- Clear explanation first
- Code blocks with syntax highlighting
- Bullet points for key takeaways
- Links to official docs (when relevant)`,
  reasoning: 'This prompt works well because it: (1) Sets clear context and role, (2) Provides structured instructions, (3) Specifies output format, (4) Includes examples and best practices, (5) Guides the AI toward actionable, high-quality responses.',
  tips: [
    'Add specific constraints (e.g., "keep under 500 words") for more focused outputs',
    'Include 2-3 examples in the instruction for few-shot learning',
    'Use delimiters (### or ---) to separate different sections clearly',
  ],
  variations: [] as string[],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { task, context, model, variations } = body;

    if (!task) {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      );
    }

    // 如果没有 API Key，使用 mock 数据
    if (!process.env.OPENAI_API_KEY && !process.env.DEEPSEEK_API_KEY) {
      console.log('⚠️ No API key found, returning mock data');
      
      let result = { ...MOCK_RESULT };
      
      // 如果请求多个变体
      if (variations && variations > 1) {
        result.variations = Array(variations).fill(MOCK_RESULT.optimized_prompt);
      }
      
      return NextResponse.json({
        success: true,
        ...result,
        warning: 'Using mock data. Please configure OPENAI_API_KEY for production use.',
        timestamp: new Date().toISOString(),
      });
    }

    // 有 API Key，正常调用
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
    });

    // 生成优化提示词
    const promptGenerationPrompt = `You are an expert prompt engineer. Generate an optimized prompt for the following task.

Task: ${task}
${context ? `Context: ${context}` : ''}
${model ? `Target Model: ${model}` : ''}

Return JSON with:
- optimized_prompt: the optimized prompt text
- reasoning: why this prompt works well
- tips: array of 2-3 tips for further improvement`;

    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o',
      messages: [
        { role: 'system', content: promptGenerationPrompt },
        { role: 'user', content: `Generate optimized prompt for: ${task}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    let result: any = JSON.parse(response.choices[0].message.content || '{}');

    // 如果请求多个变体
    if (variations && variations > 1) {
      const variationPrompts = [];
      for (let i = 0; i < variations; i++) {
        const varResponse = await openai.chat.completions.create({
          model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4o',
          messages: [
            { role: 'system', content: 'Generate a variation of the prompt with a different approach.' },
            { role: 'user', content: `Original task: ${task}\n\nGenerate variation ${i + 1}` }
          ],
          temperature: 0.8,
        });
        variationPrompts.push(varResponse.choices[0].message.content);
      }
      result.variations = variationPrompts;
    }

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Prompt generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt', details: error.message },
      { status: 500 }
    );
  }
}
