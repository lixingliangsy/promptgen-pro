// pages/api/generate.js
// Note

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-key',
});

const anthropic = null; // When using Claude API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const {
      description,
      model = 'gpt-4',
      templateId,
      variables,
      outputFormat = 'detailed'
    } = req.body;
    
    if (!description) {
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      });
    }
    
    // Use template when templateId is provided
    let prompt = description;
    if (templateId) {
      // Build prompt from template (hardcoded demo)
      const templates = {
        'tpl_001': `Write an article about ${description}.
Requirements:
1. Length: ~1500 words
2. Style: professional but accessible
3. Include introduction, body, and conclusion
4. Use clear language and vivid examples`,
        'tpl_002': `Generate Python code for ${description}.\nRequirements:\n1. Clear, readable code\n2. Detailed comments\n3. Follow best practices\n4. Include usage examples\n5. Handle errors appropriately`,
        'tpl_003': `Analyze the following data and produce a report:\nData: ${description}\nRequirements:\n1. Identify key trends and patterns\n2. Provide statistical summary\n3. Actionable insights\n4. Visualization suggestions\n5. Conclusions and recommendations`
      };
      prompt = templates[templateId] || description;
    }
    
    // Call AI model to optimize prompt
    let generatedPrompt = '';
    let modelUsed = model;
    
    if (model === 'gpt-4' || model === 'gpt-3.5-turbo') {
      // Use OpenAI API
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a prompt engineering expert. Your task is to optimize and enhance the given prompt to get the best possible results from AI models. Make the prompt clear, specific, and effective.'
          },
          {
            role: 'user',
            content: `Please optimize this prompt for best results: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      generatedPrompt = completion.choices[0].message.content;
    } else if (model === 'claude') {
      // Use Claude API (requires configuration)
      generatedPrompt = `Optimized prompt for Claude:\n\n${prompt}\n\nNote: For best results with Claude, be specific about desired output format and include examples if possible.`;
    } else {
      // Mock generation (demo mode)
      generatedPrompt = `**Optimized Prompt:**\n\n${prompt}\n\n**Tips for best results:**\n1. Be specific about output format\n2. Include examples if possible\n3. Specify constraints and requirements clearly\n4. Use step-by-step instructions for complex tasks`;
    }
    
    // Generate variants
    const variants = [
      {
        name: 'Standard',
        prompt: generatedPrompt,
        description: 'Balanced prompt suitable for most use cases'
      },
      {
        name: 'Detailed',
        prompt: `${generatedPrompt}\n\nPlease provide a comprehensive and detailed response.`,
        description: 'Enhanced for more detailed and thorough responses'
      },
      {
        name: 'Concise',
        prompt: `${generatedPrompt}\n\nPlease be concise and to the point.`,
        description: 'Optimized for brief and focused responses'
      }
    ];
    
    return res.status(200).json({
      success: true,
      originalDescription: description,
      generatedPrompt,
      variants,
      model: modelUsed,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Generate API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate prompt',
      details: error.message
    });
  }
}
