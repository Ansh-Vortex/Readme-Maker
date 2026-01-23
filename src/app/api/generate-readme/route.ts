import { NextRequest, NextResponse } from 'next/server';

// Updated API Endpoint for Z.ai GLM-4.7 - Chat Completions
const ZHIPU_API_URL = 'https://api.z.ai/api/coding/paas/v4/chat/completions';

interface GenerateRequest {
    projectName: string;
    projectDescription: string;
    techStack: string[];
    section: string;
    additionalContext?: string;
    existingContent?: string;
    instruction?: string;
    fileContents?: Record<string, string>;
}

const SECTION_PROMPTS: Record<string, string> = {
    refine: `Refine the following content based on the user's instruction.
Maintain the markdown formatting.
Return ONLY the updated content.`,

    full: `Generate a README.md that makes the developer look instantly hireable.
CRITICAL: Content must be top-tier, authoritative, and showcase deep technical understanding.
Include:
- **Title & Slogan**: Modern, catchy, and professional.
- **About**: A compelling technical narrative (Why this exists + How it works).
- **Key Features**: 6-8 distinct, high-value features with technical depth.
- **Architecture**: (Optional) Explain the system design/data flow.
- **Installation**: Precise, copy-ready commands.
- **Usage**: Production-ready code examples (Basic & Advanced).
- **Contributing**: Professional guidelines encouraging quality contributions.
- **License**: The detected license.`,

    description: `Write a "Hire-Worthy" introduction.
- **Professionalism**: Write as if this is a major open-source product (e.g., Next.js, Stripe).
- **Hook**: Powerful, problem-solution format.
- **Content**: 1-2 dense paragraphs. Focus on *value*, *performance*, and *developer experience*.
- **Tone**: Confident, technically precise, and impressive. No generic fluff.`,

    features: `Generate a feature list that showcases engineering talent.
- **Depth**: Don't just list features; explain the *technical implementation* or *value* (e.g., "Zero-config" not just "Easy").
- **Format**:
- ✨ **Feature Name** - Technical description.
- Use 6-8 items. Use diverse, professional emojis.`,

    installation: `Generate a production-grade installation guide.
- Accuracy is paramount. Use the detected package manager.
- Include 'Prerequisites' and 'Environment Setup' sections.
- Make it foolproof.`,

    usage: `Generate usage examples that show off the code's elegance.
- **Scenario**: Choose a realistic, impressive use case.
- **Quality**: The code example must follow best practices and look clean.
- **Structure**: Show 'Quick Start' and 'Advanced Configuration'.`,

    api: `Generate API docs that assume a technical audience.
- Concise, clear, and accurate.
- Use tables for params.`,

    contributing: `Generate standard professional contributing guidelines.
- Brief but encouraging.
- Mention code quality standards.`,
};

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();
        const { projectName, projectDescription, techStack, section, additionalContext, existingContent, instruction, fileContents } = body;

        const apiKey = process.env.ZHIPU_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured. Please add ZHIPU_API_KEY to your .env file.' },
                { status: 500 }
            );
        }

        const sectionPrompt = SECTION_PROMPTS[section] || SECTION_PROMPTS.description;

        const systemPrompt = `You are a Senior Technical Writer & Developer Advocate at a top tech company.
Your goal: Write README documentation that makes the repository owner look like a world-class engineer.
- **Tone**: Authoritative, concise, and technically rich.
- **Quality**: Zero fluff. Every sentence must add value or explain a concept.
- **Style**: Use formatting (bolding, lists, code blocks) to make it scannable and beautiful.
- **Inference**: Deeply analyze the file names and structure to infer high-level architecture and design patterns.
- **Objective**: The result should look like it belongs on the Trending page of GitHub.`;

        let userInput = '';
        if (section === 'refine' && existingContent && instruction) {
            userInput = `Refine the following content:
\`\`\`markdown
${existingContent}
\`\`\`

Instruction: ${instruction}

${SECTION_PROMPTS.refine}`;
        } else {
            let contextBuilder = `Project Name: ${projectName || 'Unnamed Project'}
Project Description: ${projectDescription || 'A software project'}
Tech Stack: ${techStack.length > 0 ? techStack.join(', ') : 'Not specified'}
${additionalContext ? `Additional Context: ${additionalContext}` : ''}`;

            if (fileContents && Object.keys(fileContents).length > 0) {
                contextBuilder += `\n\n## Repository File Contents\nUse these files to understand the project structure, dependencies, and usage:\n`;
                for (const [filename, content] of Object.entries(fileContents)) {
                    // Truncate large files to avoid token limits
                    const safeContent = content.slice(0, 15000);
                    contextBuilder += `\n### ${filename}\n\`\`\`\n${safeContent}\n\`\`\`\n`;
                }
            }

            userInput = `${contextBuilder}

${sectionPrompt}

Generate the content in markdown format. Be professional, concise, and engaging.`;
        }

        const response = await fetch(ZHIPU_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'glm-4.7',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userInput },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('❌ Zhipu API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            return NextResponse.json(
                { error: 'Failed to generate content. Please check your API key and try again.' },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('✅ Zhipu API Success:', {
            model: data.model,
            hasOutput: !!data.choices?.[0]?.message?.content,
            preview: data.choices?.[0]?.message?.content?.substring(0, 50)
        });
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
