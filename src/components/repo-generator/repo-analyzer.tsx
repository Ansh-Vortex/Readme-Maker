'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import {
    Loader2, Sparkles, Check, ArrowRight,
    Code, Package, Users, GitBranch, FileText,
    AlertCircle, Wand2
} from 'lucide-react';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';

interface RepoAnalysis {
    name: string;
    fullName: string;
    description: string;
    htmlUrl: string;
    homepage: string;
    topics: string[];
    license: string | null;
    licenseName: string | null;
    primaryLanguage: string;
    languages: { name: string; percentage: number }[];
    stars: number;
    forks: number;
    private: boolean;
    packageInfo: {
        name: string;
        version: string;
        description: string;
        scripts: string[];
        dependencies: string[];
        devDependencies: string[];
        keywords: string[];
        author: any;
        license: string;
    } | null;
    fileContents?: Record<string, string>;
    contributors: { login: string; avatar: string; contributions: number }[];
    hasReadme: boolean;
    owner: { login: string; avatar: string };
}

interface RepoAnalyzerProps {
    repo: { fullName: string; name: string };
    onComplete: () => void;
    onBack: () => void;
}

export const RepoAnalyzer = ({ repo, onComplete, onBack }: RepoAnalyzerProps) => {
    const [step, setStep] = useState<'prompt' | 'analyzing' | 'generating' | 'complete' | 'error'>('prompt');
    const [analysis, setAnalysis] = useState<RepoAnalysis | null>(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [userPrompt, setUserPrompt] = useState('');

    const {
        updateNestedData,
        updateData,
        addFeature,
        updateFeature,
        addTechStack,
        regenerateMarkdown
    } = useRepoReadmeStore();

    const analyzeSteps = [
        { icon: Code, label: 'Fetching repository info...', done: false },
        { icon: Package, label: 'Analyzing languages & dependencies...', done: false },
        { icon: Users, label: 'Getting contributors...', done: false },
        { icon: Sparkles, label: 'Generating README with AI...', done: false },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const startAnalysis = () => {
        setStep('analyzing');
        analyzeRepo();
    };

    const analyzeRepo = async () => {
        try {
            // Step 1: Fetch repo analysis
            setCurrentStep(0);
            setProgress(10);

            const [owner, repoName] = repo.fullName.split('/');
            const response = await fetch(`/api/repos/${owner}/${repoName}`);

            if (!response.ok) {
                throw new Error('Failed to analyze repository');
            }

            const data = await response.json();
            setAnalysis(data.analysis);

            setCurrentStep(1);
            setProgress(30);
            await new Promise(r => setTimeout(r, 500));

            setCurrentStep(2);
            setProgress(50);
            await new Promise(r => setTimeout(r, 500));

            // Step 2: Generate README with AI
            setCurrentStep(3);
            setStep('generating');
            setProgress(70);

            await generateReadmeFromAnalysis(data.analysis);

            setProgress(100);
            setStep('complete');

        } catch (err: any) {
            setError(err.message || 'Failed to analyze repository');
            setStep('error');
        }
    };

    const generateReadmeFromAnalysis = async (analysis: RepoAnalysis) => {
        // Populate the store with analyzed data

        // Project Info
        updateNestedData('projectInfo', 'name', analysis.name);
        updateNestedData('projectInfo', 'description', analysis.description || '');
        updateNestedData('projectInfo', 'websiteUrl', analysis.homepage || '');

        // Add badges based on repo info
        const badges = [];

        // License Badge
        // License Badge - Improved
        const licenseValue = (analysis.license && analysis.license !== 'NOASSERTION' && analysis.license !== 'Other') ? analysis.license : (analysis.licenseName !== 'Other' ? analysis.licenseName : null);

        if (licenseValue) {
            const shortLicense = licenseValue.replace(/ License/i, '').replace(/ License/i, '');
            badges.push({
                id: crypto.randomUUID(),
                label: 'License',
                message: shortLicense,
                color: '0080ff',
                style: 'for-the-badge' as const,
                logoName: '',
                logoColor: 'white',
            });
        }

        // Language Badges - REMOVED (Handled by Tech Stack to avoid duplicates)
        /*
        const langColors: Record<string, string> = {
             // ... colors
        };
        const processedLangs = new Set();
        // ... loop logic
        */

        badges.push({
            id: crypto.randomUUID(),
            label: 'Stars',
            message: analysis.stars.toString(),
            color: 'yellow',
            style: 'for-the-badge' as const,
            logoName: 'github',
            logoColor: 'white',
        });

        updateNestedData('projectInfo', 'badges', badges);

        // Tech Stack from languages
        for (const lang of analysis.languages.slice(0, 6)) {
            const techMap: Record<string, string> = {
                'TypeScript': 'typescript',
                'JavaScript': 'javascript',
                'Python': 'python',
                'Java': 'java',
                'Go': 'go',
                'Rust': 'rust',
                'C++': 'cpp',
                'C': 'c',
                'HTML': 'html',
                'CSS': 'css',
                'SCSS': 'sass',
                'PHP': 'php',
                'Ruby': 'ruby',
                'Swift': 'swift',
                'Kotlin': 'kotlin',
            };
            if (techMap[lang.name]) {
                addTechStack(techMap[lang.name]);
            }
        }

        // Add dependencies as tech stack
        if (analysis.packageInfo) {
            const depTechMap: Record<string, string> = {
                'react': 'react',
                'next': 'nextjs',
                'vue': 'vue',
                'angular': 'angular',
                'express': 'express',
                'nestjs': 'nestjs',
                'tailwindcss': 'tailwind',
                'mongodb': 'mongodb',
                'postgres': 'postgres',
                'prisma': 'prisma',
                'docker': 'docker',
                'vite': 'vite',
            };

            for (const dep of analysis.packageInfo.dependencies) {
                for (const [key, value] of Object.entries(depTechMap)) {
                    if (dep.includes(key)) {
                        addTechStack(value);
                    }
                }
            }
        }

        // License
        if (analysis.license) {
            updateNestedData('license', 'enabled', true);
            const licenseMap: Record<string, string> = {
                'MIT': 'MIT',
                'Apache-2.0': 'Apache-2.0',
                'GPL-3.0': 'GPL-3.0',
                'BSD-3-Clause': 'BSD-3-Clause',
                'ISC': 'ISC',
            };
            updateNestedData('license', 'type', licenseMap[analysis.license] || 'MIT');
            updateNestedData('license', 'holder', analysis.owner.login);
        }

        // Author
        updateNestedData('author', 'name', analysis.owner.login);
        updateNestedData('author', 'github', analysis.owner.login);

        // Installation (if package.json exists)
        if (analysis.packageInfo) {
            updateNestedData('installation', 'enabled', true);
            updateNestedData('installation', 'packageName', analysis.packageInfo.name);

            // Add common scripts as features
            if (analysis.packageInfo.scripts.includes('dev')) {
                updateNestedData('installation', 'installCommands',
                    `# Clone the repository
git clone ${analysis.htmlUrl}.git
cd ${analysis.name}

# Install dependencies
npm install

# Start development server
npm run dev`
                );
            }
        }

        // Generate AI content for all sections
        try {
            const depsInfo = analysis.packageInfo
                ? 'Dependencies: ' + analysis.packageInfo.dependencies.slice(0, 10).join(', ')
                : '';

            const commonContext = [
                `Project Name: ${analysis.name}`,
                `Repository URL: https://github.com/${analysis.owner.login}/${analysis.name}`,
                `Clone Command: git clone https://github.com/${analysis.owner.login}/${analysis.name}.git`,
                'This is a ' + (analysis.private ? 'private' : 'public') + ' repository.',
                'Main language: ' + analysis.primaryLanguage,
                'Topics: ' + analysis.topics.join(', '),
                depsInfo,
                userPrompt ? `\n**USER INSTRUCTIONS (PRIORITIZE THIS)**: ${userPrompt}` : ''
            ].filter(Boolean).join('\n');

            // Parallelize requests for speed
            const [descDetails, featuresDetails, installDetails, usageDetails, contribDetails] = await Promise.allSettled([
                // 1. Description (and Tagline)
                fetch('/api/generate-readme', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName: analysis.name,
                        projectDescription: analysis.description || ('A ' + analysis.primaryLanguage + ' project'),
                        techStack: analysis.languages.map(l => l.name),
                        section: 'description',
                        additionalContext: commonContext,
                        fileContents: analysis.fileContents,
                    }),
                }).then(async res => {
                    if (!res.ok) throw new Error(await res.text());
                    return res.json();
                }),

                // 2. Features
                fetch('/api/generate-readme', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName: analysis.name,
                        projectDescription: analysis.description || '',
                        techStack: analysis.languages.map(l => l.name),
                        section: 'features',
                        additionalContext: commonContext,
                        fileContents: analysis.fileContents,
                    }),
                }).then(async res => {
                    if (!res.ok) throw new Error(await res.text());
                    return res.json();
                }),

                // 3. Installation
                !analysis.packageInfo ? fetch('/api/generate-readme', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName: analysis.name,
                        projectDescription: analysis.description || '',
                        techStack: analysis.languages.map(l => l.name),
                        section: 'installation',
                        additionalContext: commonContext,
                        fileContents: analysis.fileContents,
                    }),
                }).then(async res => {
                    if (!res.ok) throw new Error(await res.text());
                    return res.json();
                }) : Promise.resolve(null),

                // 4. Usage
                fetch('/api/generate-readme', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName: analysis.name,
                        projectDescription: analysis.description || '',
                        techStack: analysis.languages.map(l => l.name),
                        section: 'usage',
                        additionalContext: commonContext,
                        fileContents: analysis.fileContents,
                    }),
                }).then(async res => {
                    if (!res.ok) throw new Error(await res.text());
                    return res.json();
                }),

                // 5. Contributing
                fetch('/api/generate-readme', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName: analysis.name,
                        projectDescription: analysis.description || '',
                        techStack: analysis.languages.map(l => l.name),
                        section: 'contributing',
                        additionalContext: commonContext,
                        fileContents: analysis.fileContents,
                    }),
                }).then(async res => {
                    if (!res.ok) throw new Error(await res.text());
                    return res.json();
                })
            ]);

            // Process Results
            if (descDetails.status === 'fulfilled') {
                const content = descDetails.value.content;
                const taglineMatch = content.match(/Tagline:\s*(.+)/i);
                const descMatch = content.match(/Description:\s*([\s\S]+)/i);

                if (taglineMatch) {
                    updateNestedData('projectInfo', 'tagline', taglineMatch[1].trim());
                }
                if (descMatch) {
                    updateNestedData('projectInfo', 'description', descMatch[1].trim());
                } else if (!taglineMatch) {
                    // Fallback if no format matched
                    updateNestedData('projectInfo', 'description', content);
                }
            }

            if (featuresDetails.status === 'fulfilled') {
                const data = featuresDetails.value;
                // Clear existing first
                useRepoReadmeStore.setState(state => ({
                    data: { ...state.data, features: { ...state.data.features, items: [] } }
                }));

                // More robust regex to catch "Feature Name: Description" or "Feature Name - Description"
                // or just bolded items.
                const featureLines = data.content.split('\n').filter((line: string) =>
                    line.trim().length > 5 && (line.match(/^[-*•]|\d+\./) || line.includes('**'))
                );

                for (const line of featureLines.slice(0, 8)) {
                    // Match: (bullet/number) (Title) (separator) (Description)
                    // Group 1: Title (inside ** if present, or just text)
                    // Group 2: Description
                    const match = line.match(/^(?:[-*•\d\.]+\s*)?(?:\*\*)?(.+?)(?:\*\*)?(?:\s*[-–:]\s*)(.+)$/);

                    if (match) {
                        addFeature();
                        await new Promise(r => setTimeout(r, 0));
                        const features = useRepoReadmeStore.getState().data.features.items;
                        if (features.length > 0) {
                            const lastFeature = features[features.length - 1];
                            updateFeature(lastFeature.id, {
                                emoji: '✨',
                                title: match[1]?.trim() || 'Feature',
                                description: match[2]?.trim() || '',
                            });
                        }
                    } else if (line.includes('**')) {
                        // Fallback for lines that are just "**Title** Description" without separator
                        const simpleMatch = line.match(/\*\*(.+?)\*\*\s*(.*)/);
                        if (simpleMatch) {
                            addFeature();
                            await new Promise(r => setTimeout(r, 0));
                            const features = useRepoReadmeStore.getState().data.features.items;
                            if (features.length > 0) {
                                const lastFeature = features[features.length - 1];
                                updateFeature(lastFeature.id, {
                                    emoji: '✨',
                                    title: simpleMatch[1]?.trim(),
                                    description: simpleMatch[2]?.trim() || 'High-performance feature.',
                                });
                            }
                        }
                    }
                }
            }

            // Other sections (Installation, Usage, Contributing) logic would follow here if needed customization
            if (installDetails.status === 'fulfilled' && installDetails.value) {
                updateNestedData('installation', 'installCommands', installDetails.value.content);
                updateNestedData('installation', 'packageManager', 'npm'); // Default
                updateNestedData('installation', 'enabled', true);
            }

            if (usageDetails.status === 'fulfilled') {
                updateNestedData('usage', 'quickStart', usageDetails.value.content);
                updateNestedData('usage', 'enabled', true);
            }

            if (contribDetails.status === 'fulfilled') {
                updateNestedData('contributing', 'guidelines', contribDetails.value.content);
                updateNestedData('contributing', 'enabled', true);
            }

            regenerateMarkdown();
            setProgress(100);
            setStep('complete');

        } catch (err: any) {
            setError(err.message || 'Failed to analyze repository');
            setStep('error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#0d1117] flex items-center justify-center"
        >
            <div className="max-w-lg w-full p-8">
                {step === 'error' ? (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">Analysis Failed</h2>
                        <p className="text-[#8b949e] mb-6">{error}</p>
                        <div className="flex gap-3 justify-center">
                            <Button onClick={onBack} variant="ghost" className="text-[#8b949e]">
                                Go Back
                            </Button>
                            <Button onClick={analyzeRepo} className="bg-[#238636] hover:bg-[#2ea043] text-white">
                                Try Again
                            </Button>
                        </div>
                    </div>
                ) : step === 'complete' ? (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#238636]/20 flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-[#3fb950]" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">README Generated!</h2>
                        <p className="text-[#8b949e] mb-6">
                            Your README has been generated from <strong className="text-white">{repo.name}</strong>.
                            You can now customize it further.
                        </p>
                        <Button
                            onClick={onComplete}
                            className="bg-gradient-to-r from-[#a371f7] to-[#8957e5] hover:from-[#8957e5] hover:to-[#7c3aed] text-white gap-2"
                        >
                            Customize README
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </motion.div>
                ) : step === 'prompt' ? (
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#a371f7]/20 flex items-center justify-center mb-4">
                                <Sparkles className="w-8 h-8 text-[#a371f7]" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Customize Your README</h2>
                            <p className="text-[#8b949e]">
                                Tell the AI what kind of README you want for <strong className="text-white">{repo.name}</strong>
                            </p>
                        </div>

                        {/* Preset Suggestions */}
                        <div className="space-y-2">
                            <label className="text-xs text-[#8b949e]">Quick presets:</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: '✨ Professional & Clean', value: 'Make it professional, clean, and minimal. Focus on clarity.' },
                                    { label: '🎨 Beautiful & Stunning', value: 'Make it visually stunning with beautiful badges, emojis, and modern styling.' },
                                    { label: '📚 Detailed & Complete', value: 'Include all sections: features, installation, usage examples, API docs, contributing guidelines.' },
                                    { label: '🚀 Startup-style', value: 'Make it punchy like a startup landing page - catchy tagline, key features, quick start.' },
                                ].map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => setUserPrompt(preset.value)}
                                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${userPrompt === preset.value
                                            ? 'bg-[#a371f7] text-white'
                                            : 'bg-[#21262d] text-[#8b949e] hover:text-white border border-[#30363d] hover:border-[#a371f7]'
                                            }`}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Prompt Input */}
                        <div className="space-y-2">
                            <label className="text-xs text-[#8b949e]">Or describe what you want:</label>
                            <Textarea
                                value={userPrompt}
                                onChange={(e) => setUserPrompt(e.target.value)}
                                placeholder="e.g., Make it look professional with a focus on the API documentation. Include code examples for Python and JavaScript..."
                                className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button onClick={onBack} variant="ghost" className="text-[#8b949e] hover:text-white">
                                ← Back
                            </Button>
                            <Button
                                onClick={startAnalysis}
                                className="flex-1 bg-gradient-to-r from-[#a371f7] to-[#8957e5] hover:from-[#8957e5] hover:to-[#7c3aed] text-white gap-2"
                            >
                                <Wand2 className="w-4 h-4" />
                                Generate README
                            </Button>
                        </div>

                        <p className="text-xs text-center text-[#484f58]">
                            💡 Leave empty to use smart defaults based on your repository
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#a371f7]/20 flex items-center justify-center mb-4">
                                <Wand2 className="w-8 h-8 text-[#a371f7] animate-pulse" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {step === 'analyzing' ? 'Analyzing Repository' : 'Generating README'}
                            </h2>
                            <p className="text-[#8b949e]">
                                {repo.fullName}
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#a371f7] to-[#8957e5]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Steps */}
                        <div className="space-y-3">
                            {analyzeSteps.map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${i === currentStep
                                        ? 'bg-[#161b22] border border-[#a371f7]'
                                        : i < currentStep
                                            ? 'bg-[#161b22]/50 border border-[#238636]'
                                            : 'bg-[#161b22]/30 border border-[#30363d]'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < currentStep
                                        ? 'bg-[#238636]/20'
                                        : i === currentStep
                                            ? 'bg-[#a371f7]/20'
                                            : 'bg-[#21262d]'
                                        }`}>
                                        {i < currentStep ? (
                                            <Check className="w-4 h-4 text-[#3fb950]" />
                                        ) : i === currentStep ? (
                                            <Loader2 className="w-4 h-4 text-[#a371f7] animate-spin" />
                                        ) : (
                                            <s.icon className="w-4 h-4 text-[#484f58]" />
                                        )}
                                    </div>
                                    <span className={`text-sm ${i <= currentStep ? 'text-white' : 'text-[#484f58]'
                                        }`}>
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
