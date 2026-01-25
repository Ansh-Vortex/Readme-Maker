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

    full: `Generate a STUNNING, visually impressive README.md that makes this project irresistible.
CRITICAL REQUIREMENTS:
- **Header**: Create an eye-catching centered header with logo placeholder, badges, and a powerful one-liner tagline
- **Professional Badges**: Include License, Version, Build Status, Stars using shields.io format
- **Tech Stack Badges**: Display all technologies with beautiful colored badges
- **About/Description**: Compelling 2-3 sentence hook that sells the project's value
- **✨ Key Features**: 6-8 features with emojis, bold titles, and clear value propositions
- **🖼 Screenshots/Demo**: Include placeholder section for visuals (image tags with "your-screenshot.png")
- **📦 Installation**: Multiple package manager options (npm, yarn, pnpm) with copy-ready code blocks
- **🚀 Quick Start**: Minimal working example that a developer can run in under 2 minutes
- **📖 Usage Examples**: 2-3 real-world usage scenarios with clean, commented code
- **⚙️ Configuration**: Environment variables and config options in a clean table format
- **🤝 Contributing**: Welcoming guidelines with steps for PR submission
- **📄 License**: Clear license statement with year and holder
- **👨‍💻 Author**: Section with social links (GitHub, Twitter badges)

STYLE: Modern, clean, GitHub-flavored markdown. Use horizontal rules (---) to separate major sections.
Use <div align="center"> for centered content. Make it VISUALLY STUNNING.`,

    description: `Write a POWERFUL project introduction that captures attention immediately.
FORMAT (strict):
Tagline: [One impactful sentence - like a startup pitch, max 15 words]
Description: [2-3 sentences that answer: What is it? Who is it for? Why is it special?]

TONE: Confident, professional, inspiring. Avoid generic phrases like "easy to use" or "powerful".
Be specific about the unique value proposition.`,

    features: `Generate a STUNNING feature list that showcases the project's brilliance.
REQUIREMENTS:
- Use diverse, relevant emojis (⚡ 🔒 🎨 🚀 💡 📦 🔧 🌐 📊 🛡️)
- Each feature must have a BOLD title and a clear technical description
- Focus on developer benefits and technical capabilities
- Include 6-8 features

FORMAT (strict line structure):
- ⚡ **Feature Title** - Clear description of what it does and why it matters
- 🔒 **Another Feature** - Technical benefit with specific details

Make features sound impressive but accurate.`,

    installation: `Generate a COMPREHENSIVE, foolproof installation guide.
REQUIREMENTS:
- Prerequisites section with version requirements
- Multiple package managers (npm, yarn, pnpm, bun)
- Clone from source option with git commands
- Environment setup (.env.example values)
- Verification step ("Run npm test to verify installation")

Use proper markdown code blocks with language hints (bash, shell).
Make it IMPOSSIBLE to fail installation by following these steps.`,

    usage: `Generate IMPRESSIVE usage examples that showcase the code's elegance.
REQUIREMENTS:
- Quick Start (5 lines or less to get something working)
- Basic Example with comments explaining each line
- Advanced Example showing powerful configuration options
- Expected Output section

Use realistic, production-quality code. Add helpful inline comments.
Code should follow best practices and look professional.`,

    api: `Generate clean, professional API documentation.
REQUIREMENTS:
- Use a markdown table for endpoints/methods
- Include parameters, types, defaults, and descriptions
- Add request/response examples in code blocks
- Keep it scannable and developer-friendly`,

    contributing: `Generate welcoming, professional contributing guidelines.
INCLUDE:
- How to report bugs (issue template mention)
- How to suggest features
- Pull Request process (fork, branch, PR)
- Code style expectations
- A warm "thank you" to contributors

TONE: Encouraging, professional, community-focused.`,
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

        const systemPrompt = `You are a Principal Software Architect at a FAANG company.
Your goal: Rewrite the README content to be absolutely perfect, professional, and hire-worthy.
- **Audience**: Recruiters, CTOs, and Senior Engineers.
- **Tone**: World-class, confident, precise. No filler. No repetition.
- **Constraint**: Use the provided file context to write *factually accurate* and *technically deep* content.
- **Brevity**: Be extremely concise. Only include necessary information. "Show, don't tell."`;

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
