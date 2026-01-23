'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
    const [step, setStep] = useState<'analyzing' | 'generating' | 'complete' | 'error'>('analyzing');
    const [analysis, setAnalysis] = useState<RepoAnalysis | null>(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

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

    useEffect(() => {
        analyzeRepo();
    }, []);

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
        const licenseValue = analysis.license === 'NOASSERTION' ? null : analysis.license;
        if (licenseValue || analysis.licenseName) {
            badges.push({
                id: crypto.randomUUID(),
                label: 'License',
                message: licenseValue || 'License',
                color: '0080ff',
                style: 'for-the-badge' as const,
                logoName: '',
                logoColor: 'white',
            });
        }

        // Language Badges - Generate for all languages
        const langColors: Record<string, string> = {
            'TypeScript': '3178C6',
            'JavaScript': 'F7DF1E',
            'Python': '3776AB',
            'Java': 'ED8B00',
            'Go': '00ADD8',
            'Rust': '000000',
            'C++': '00599C',
            'C': '555555',
            'C#': '239120',
            'PHP': '777BB4',
            'Ruby': 'CC342D',
            'Swift': 'F05138',
            'Kotlin': '7F52FF',
            'Dart': '0175C2',
            'Lua': '2C2D72',
            'Shell': '89E051',
            'HTML': 'E34F26',
            'CSS': '563D7C',
            'Vue': '4FC08D',
        };

        const processedLangs = new Set();

        // Add primary language first
        if (analysis.primaryLanguage && !processedLangs.has(analysis.primaryLanguage)) {
            badges.push({
                id: crypto.randomUUID(),
                label: analysis.primaryLanguage,
                message: '',
                color: langColors[analysis.primaryLanguage] || '333333',
                style: 'for-the-badge' as const,
                logoName: analysis.primaryLanguage.toLowerCase().replace(/[^a-z0-9]/g, ''),
                logoColor: 'white',
            });
            processedLangs.add(analysis.primaryLanguage);
        }

        // Add other languages
        analysis.languages.forEach(lang => {
            if (!processedLangs.has(lang.name)) {
                badges.push({
                    id: crypto.randomUUID(),
                    label: lang.name,
                    message: '',
                    color: langColors[lang.name] || '333333',
                    style: 'for-the-badge' as const,
                    logoName: lang.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
                    logoColor: 'white',
                });
                processedLangs.add(lang.name);
            }
        });

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
                'This is a ' + (analysis.private ? 'private' : 'public') + ' repository.',
                'Main language: ' + analysis.primaryLanguage,
                'Topics: ' + analysis.topics.join(', '),
                depsInfo
            ].filter(Boolean).join('\n');

            // 1. Generate Description
            setProgress(60);
            const descResponse = await fetch('/api/generate-readme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName: analysis.name,
                    projectDescription: analysis.description || ('A ' + analysis.primaryLanguage + ' project'),
                    techStack: analysis.languages.map(l => l.name),
                    section: 'description',
                    additionalContext: commonContext,
                }),
            });
            if (descResponse.ok) {
                const data = await descResponse.json();
                updateNestedData('projectInfo', 'description', data.content);
            }

            // 2. Generate Features
            setProgress(70);
            const featuresResponse = await fetch('/api/generate-readme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName: analysis.name,
                    projectDescription: analysis.description || '',
                    techStack: analysis.languages.map(l => l.name),
                    section: 'features',
                    additionalContext: commonContext,
                }),
            });
            if (featuresResponse.ok) {
                const data = await featuresResponse.json();
                // Clear existing first
                useRepoReadmeStore.setState(state => ({
                    data: { ...state.data, features: { ...state.data.features, items: [] } }
                }));

                const featureLines = data.content.split('\n').filter((line: string) =>
                    line.trim().startsWith('-') || line.trim().startsWith('•')
                );

                for (const line of featureLines.slice(0, 6)) {
                    const match = line.match(/[-•]\s*(.+?)(?:\s*[-–]\s*(.+))?$/);
                    if (match) {
                        addFeature();
                        // wait a tick for state update
                        await new Promise(r => setTimeout(r, 0));
                        const features = useRepoReadmeStore.getState().data.features.items;
                        if (features.length > 0) {
                            const lastFeature = features[features.length - 1];
                            updateFeature(lastFeature.id, {
                                emoji: '✨',
                                title: match[1].replace(/\*\*/g, '').trim(),
                                description: match[2]?.trim() || '',
                            });
                        }
                    }
                }
            }

            // 3. Generate Installation
            setProgress(80);
            if (!analysis.packageInfo) {
                const installResponse = await fetch('/api/generate-readme', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectName: analysis.name,
                        projectDescription: analysis.description || '',
                        techStack: analysis.languages.map(l => l.name),
                        section: 'installation',
                        additionalContext: commonContext,
                    }),
                });
                if (installResponse.ok) {
                    const data = await installResponse.json();
                    updateNestedData('installation', 'enabled', true);
                    const codeMatch = data.content.match(/```(?:bash|sh|cmd)?\s*([\s\S]*?)```/);
                    if (codeMatch) {
                        updateNestedData('installation', 'installCommands', codeMatch[1].trim());
                    } else {
                        updateNestedData('installation', 'installCommands', data.content);
                    }
                }
            }

            // 4. Generate Usage
            setProgress(90);
            const usageResponse = await fetch('/api/generate-readme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName: analysis.name,
                    projectDescription: analysis.description || '',
                    techStack: analysis.languages.map(l => l.name),
                    section: 'usage',
                    additionalContext: commonContext,
                }),
            });
            if (usageResponse.ok) {
                const data = await usageResponse.json();
                updateNestedData('usage', 'enabled', true);
                updateNestedData('usage', 'usageDescription', data.content);
            }

            // 5. Generate Contributing
            const contribResponse = await fetch('/api/generate-readme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName: analysis.name,
                    projectDescription: analysis.description || '',
                    techStack: analysis.languages.map(l => l.name),
                    section: 'contributing',
                    additionalContext: commonContext,
                }),
            });
            if (contribResponse.ok) {
                const data = await contribResponse.json();
                updateNestedData('contributing', 'enabled', true);
                updateNestedData('contributing', 'guidelines', data.content);
            }

        } catch (e) {
            console.error('AI generation failed:', e);
            // Continue with whatever data we have
        }

        // Regenerate the markdown
        regenerateMarkdown();
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
