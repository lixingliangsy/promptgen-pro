// pages/api/templates.js
// Note

let templates = [
  {
    id: 'tpl_001',
    name: 'Article writing',
    category: 'writing',
    description: 'A prompt template for generating high-quality article content',
    template: 'Write an article about [topic].\nRequirements:\n1. Length: [length]\n2. Tone: [tone]\n3. Audience: [audience]\n4. Include an introduction, body and conclusion\n5. Use clear language and vivid examples',
    variables: ['topic', 'length', 'tone', 'audience'],
    example: 'Write an article about AI in healthcare.\nRequirements:\n1. Length: 1500 words\n2. Tone: professional but accessible\n3. Audience: healthcare professionals\n4. Include an introduction, body and conclusion\n5. Use clear language and vivid examples',
    createdAt: '2026-01-01',
    usageCount: 1250
  },
  {
    id: 'tpl_002',
    name: 'Code generation',
    category: 'programming',
    description: 'Generate code for a specific feature',
    template: 'Write [language] code that implements [feature description].\nRequirements:\n1. Clear, readable code\n2. Detailed comments\n3. Follow best practices\n4. Include a usage example\n5. Handle the errors that can occur',
    variables: ['language', 'feature description'],
    example: 'Write Python code that implements a file-upload feature.\nRequirements:\n1. Clear, readable code\n2. Detailed comments\n3. Follow best practices\n4. Include a usage example\n5. Handle the errors that can occur',
    createdAt: '2026-01-02',
    usageCount: 980
  },
  {
    id: 'tpl_003',
    name: 'Data analysis',
    category: 'analysis',
    description: 'Analyse data and produce a report',
    template: 'Analyse the following data and produce a report:\nData: [data description]\nAnalysis requirements:\n1. Identify the key trends and patterns\n2. Provide a statistical summary\n3. Give actionable insights\n4. Suggest visualisations\n5. Include conclusions and recommendations',
    variables: ['data description'],
    example: 'Analyse the following data and produce a report:\nData: 2025 quarterly sales of 4.5M, 5.2M, 4.8M and 6.1M\nAnalysis requirements:\n1. Identify the key trends and patterns\n2. Provide a statistical summary\n3. Give actionable insights\n4. Suggest visualisations\n5. Include conclusions and recommendations',
    createdAt: '2026-01-03',
    usageCount: 750
  },
  {
    id: 'tpl_004',
    name: 'Creative writing',
    category: 'creative',
    description: 'Generate creative content such as stories and poems',
    template: 'Write a [type] piece.\nTheme: [theme]\nRequirements:\n1. Tone: [tone]\n2. Length: [length]\n3. Use vivid description\n4. Write a strong opening and ending\n5. Convey an emotion or a message',
    variables: ['type', 'theme', 'tone', 'length'],
    example: 'Write a short story.\nTheme: the consequences of time travel\nRequirements:\n1. Tone: science fiction, suspenseful\n2. Length: 2000 words\n3. Use vivid description\n4. Write a strong opening and ending\n5. Convey a message about how much choices matter',
    createdAt: '2026-01-04',
    usageCount: 620
  },
  {
    id: 'tpl_005',
    name: 'Email drafting',
    category: 'business',
    description: 'Draft a professional email',
    template: 'Help me draft a [email type] email.\nRecipient: [recipient role]\nGoal: [email goal]\nRequirements:\n1. Tone: [tone]\n2. Length: [length]\n3. Include a clear call to action\n4. Stay professional and polite',
    variables: ['email type', 'recipient role', 'email goal', 'tone', 'length'],
    example: 'Help me draft a meeting-invitation email.\nRecipient: team members\nGoal: discuss the Q2 project plan\nRequirements:\n1. Tone: friendly but professional\n2. Length: concise\n3. Include a clear call to action\n4. Stay professional and polite',
    createdAt: '2026-01-05',
    usageCount: 1100
  },
  {
    id: 'tpl_006',
    name: 'Study assistant',
    category: 'education',
    description: 'Explain a complex idea or help someone learn',
    template: 'Explain [concept/topic] in a way that is easy to follow.\nAudience: [level of knowledge]\nRequirements:\n1. Use analogies and examples\n2. Explain it step by step\n3. Summarise the key points\n4. Provide practice questions\n5. Suggest where to read further',
    variables: ['concept/topic', 'level of knowledge'],
    example: 'Explain blockchain in a way that is easy to follow.\nAudience: business people with no technical background\nRequirements:\n1. Use analogies and examples\n2. Explain it step by step\n3. Summarise the key points\n4. Provide practice questions\n5. Suggest where to read further',
    createdAt: '2026-01-06',
    usageCount: 890
  },
  {
    id: 'tpl_007',
    name: 'Product description',
    category: 'marketing',
    description: 'Generate an appealing product description',
    template: 'Write a product description for [product name].\nProduct details: [product information]\nTarget customer: [target customer]\nRequirements:\n1. Highlight the key features and benefits\n2. Use appealing language\n3. Include social proof where you have it\n4. End with a call to action\n5. Suit the [channel] channel',
    variables: ['product name', 'product information', 'target customer', 'channel'],
    example: 'Write a product description for the SmartFit Pro band.\nProduct details: 7-day battery, heart-rate monitoring, sleep tracking, 50 m water resistance\nTarget customer: fitness enthusiasts\nRequirements:\n1. Highlight the key features and benefits\n2. Use appealing language\n3. Include social proof where you have it\n4. End with a call to action\n5. Suit an e-commerce website',
    createdAt: '2026-01-07',
    usageCount: 720
  },
  {
    id: 'tpl_008',
    name: 'Question answering',
    category: 'general',
    description: 'Answer a question in depth',
    template: 'Answer the following question in depth:\nQuestion: [question]\nAnswer requirements:\n1. Give accurate, complete information\n2. Include examples where relevant\n3. Consider different viewpoints\n4. Point out any constraints or exceptions\n5. Use a clear structure',
    variables: ['question'],
    example: 'Answer the following question in depth:\nQuestion: How can I manage my time effectively?\nAnswer requirements:\n1. Give accurate, complete information\n2. Include examples where relevant\n3. Consider different viewpoints\n4. Point out any constraints or exceptions\n5. Use a clear structure',
    createdAt: '2026-01-08',
    usageCount: 1350
  }
];

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  
  switch (method) {
    case 'GET':
      if (id) {
        // Note
        const template = templates.find(t => t.id === id);
        if (!template) {
          return res.status(404).json({ success: false, error: 'Template not found' });
        }
        return res.status(200).json({ success: true, template });
      } else {
        // Note
        const { category } = req.query;
        let filtered = templates;
        
        if (category) {
          filtered = templates.filter(t => t.category === category);
        }
        
        return res.status(200).json({
          success: true,
          templates: filtered,
          categories: [...new Set(templates.map(t => t.category))]
        });
      }
      
    case 'POST':
      // Note
      const newTemplate = {
        id: `tpl_${Date.now()}`,
        ...req.body,
        createdAt: new Date().toISOString().split('T')[0],
        usageCount: 0
      };
      templates.push(newTemplate);
      return res.status(201).json({ success: true, template: newTemplate });
      
    case 'PUT':
      // Note
      if (!id) {
        return res.status(400).json({ success: false, error: 'Template ID required' });
      }
      const updateIndex = templates.findIndex(t => t.id === id);
      if (updateIndex === -1) {
        return res.status(404).json({ success: false, error: 'Template not found' });
      }
      templates[updateIndex] = { ...templates[updateIndex], ...req.body };
      return res.status(200).json({ success: true, template: templates[updateIndex] });
      
    case 'DELETE':
      // Note
      if (!id) {
        return res.status(400).json({ success: false, error: 'Template ID required' });
      }
      const deleteIndex = templates.findIndex(t => t.id === id);
      if (deleteIndex === -1) {
        return res.status(404).json({ success: false, error: 'Template not found' });
      }
      templates.splice(deleteIndex, 1);
      return res.status(200).json({ success: true, message: 'Template deleted' });
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
