import { NextRequest, NextResponse } from 'next/server';

// Updated API Endpoint for Z.ai GLM-4.7
const ZHIPU_API_URL = 'https://api.z.ai/api/coding/paas/v4';

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

    full: `Generate a complete, professional README.md for this project.
CRITICAL: The output must be comprehensive and detail-oriented. Do NOT generate generic placeholders.
Include:
- Eye-catching title with centered alignment and a project slogan
- **About**: A compelling, multi-paragraph introduction explaining the "Why" and "How".
- **Key Features**: A detailed list of features with emojis.
- **Architecture**: (Optional) If code structure allows, explain the technical design.
- **Installation**: Step-by-step commands derived from the package files.
- **Usage**: Real-world code examples.
- **Contributing**: Standard open-source guidelines.
- **License**: The detected license.`,

    description: `Write a high-impact, professional introduction for this project.
- **Hook**: Start with a powerful opening sentence.
- **Expand**: IGNORE the brevity of the provided description. Use the file contents/tech stack to infer capabilities.
- **Detail**: Write 2-3 substantial paragraphs explaining the problem this project solves and its unique approach.
- **Tone**: Exciting, developer-focused, and "Star-worthy".`,

    features: `Generate a list of 6-10 key features for this project.
- Analyze the file structure to identify actual features (e.g., "Authentication", "API Rate Limiting", "Dark Mode").
- Format strictly as:
- ✨ **Feature Name** - Detailed description of what it does and why it matters.
- Use diverse and relevant emojis.`,

    installation: `Generate a robust installation guide.
- Analyze 'package.json', 'requirements.txt', or 'go.mod' to determine exact dependencies.
- Include prerequisites (Node/Python versions).
- Provide clear, copy-pasteable bash blocks for installation.
- Include environment variable setup if config files are detected.`,

    usage: `Generate professional usage documentation.
- Create REALISTIC code examples based on the analyzed code (e.g., if it's a React lib, show a component; if CLI, show commands).
- Show "Basic Usage" and "Advanced Usage".
- Include expected output comments in code blocks.`,

    api: `Generate detailed API documentation.
- Infer endpoints from routes files (e.g., app/api/*).
- Use Markdown tables for parameters: | Param | Type | Description |
- Provide JSON request/response examples.`,

    contributing: `Generate professional contributing guidelines.
- detailed steps for forking, cloning, and branching.
- Mention code style (Prettier/ESLint if detected).
- Encourage PRs.`,
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

        const systemPrompt = `You are an elite technical writer creating world-class GitHub README documentation.
Your goal is to write content that looks like it belongs in a top-tier open source library (like React, Vercel, or Stripe).
- Be incredibly comprehensive and detailed.
- Use professional, active voice.
- Use emojis effectively but professionally.
- Write actual code examples, not just placeholders.
- If context is missing, infer reasonable defaults based on the tech stack.
- Analyze the provided file contents (package.json, config files, source code) to write deep technical descriptions.
- Extract installation commands, scripts, and usage patterns directly from the file contents.`;

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

        // Combine system prompt and user input for the 'input' field requirement of the new API
        const combinedInput = `${systemPrompt}\n\n${userInput}`;

        const response = await fetch(ZHIPU_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'glm-4.7',
                input: combinedInput,
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
            hasOutput: !!data.output_text,
            preview: data.output_text?.substring(0, 50)
        });
        const content = data.output_text || '';

        return NextResponse.json({ content, section });

    } catch (error: any) {
        console.error('Generate README error:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred while generating content' },
            { status: 500 }
        );
    }
}
