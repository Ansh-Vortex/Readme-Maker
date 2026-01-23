import { NextRequest, NextResponse } from 'next/server';

const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

interface GenerateRequest {
    projectName: string;
    projectDescription: string;
    techStack: string[];
    section: string;
    additionalContext?: string;
}

const SECTION_PROMPTS: Record<string, string> = {
    full: `Generate a complete, professional README.md for this project. Include:
- Eye-catching title with emojis
- Clear description
- Key features (with emojis)
- Installation instructions
- Usage examples with code
- Configuration if applicable
- Contributing guidelines
- License section`,

    description: `Write a compelling project description that:
- Explains what the project does
- Highlights unique value propositions
- Is concise but informative (2-3 paragraphs)
- Uses professional language`,

    features: `Generate a list of 5-8 key features for this project. Format as:
- ✨ **Feature Name** - Brief description
Use relevant emojis for each feature.`,

    installation: `Generate clear installation instructions including:
- Prerequisites
- Step-by-step installation commands
- Configuration steps if needed
Format with proper code blocks.`,

    usage: `Generate usage examples including:
- Quick start code snippet
- Common use cases with code examples
- Expected outputs where applicable
Use appropriate code block formatting.`,

    api: `Generate API documentation including:
- Endpoint descriptions
- Request/response examples in JSON
- Parameter descriptions
Format as markdown tables and code blocks.`,

    contributing: `Generate professional contributing guidelines including:
- How to fork and clone
- Development setup
- Pull request process
- Code style guidelines`,
};

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();
        const { projectName, projectDescription, techStack, section, additionalContext } = body;

        const apiKey = process.env.ZHIPU_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured. Please add ZHIPU_API_KEY to your .env file.' },
                { status: 500 }
            );
        }

        const sectionPrompt = SECTION_PROMPTS[section] || SECTION_PROMPTS.description;

        const systemPrompt = `You are an expert technical writer specializing in creating professional GitHub README files. 
You write clear, concise, and engaging documentation that follows best practices.
Always use proper markdown formatting.
Be specific and practical in your examples.`;

        const userPrompt = `Project Name: ${projectName || 'Unnamed Project'}
Project Description: ${projectDescription || 'A software project'}
Tech Stack: ${techStack.length > 0 ? techStack.join(', ') : 'Not specified'}
${additionalContext ? `Additional Context: ${additionalContext}` : ''}

${sectionPrompt}

Generate the content in markdown format. Be professional, concise, and engaging.`;

        const response = await fetch(ZHIPU_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'glm-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                temperature: 0.7,
                max_tokens: 2048,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Zhipu API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to generate content. Please check your API key and try again.' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        return NextResponse.json({ content, section });

    } catch (error: any) {
        console.error('Generate README error:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred while generating content' },
            { status: 500 }
        );
    }
}
