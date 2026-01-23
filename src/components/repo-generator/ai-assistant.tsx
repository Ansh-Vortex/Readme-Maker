'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { X, Sparkles, Send, Loader2, Copy, Check, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIAssistantProps {
    onClose: () => void;
}

export const AIAssistant = ({ onClose }: AIAssistantProps) => {
    const { data, updateNestedData, updateData } = useRepoReadmeStore();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [selectedSection, setSelectedSection] = useState<string>('full');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const sections = [
        { id: 'full', label: 'Full README', icon: '📄' },
        { id: 'description', label: 'Description', icon: '📝' },
        { id: 'features', label: 'Features', icon: '✨' },
        { id: 'installation', label: 'Installation', icon: '📦' },
        { id: 'usage', label: 'Usage Examples', icon: '💡' },
        { id: 'api', label: 'API Docs', icon: '🔌' },
        { id: 'contributing', label: 'Contributing', icon: '🤝' },
    ];

    const handleGenerate = async () => {
        if (!data.projectInfo.name && !prompt) {
            setError('Please enter a project name or describe your project');
            return;
        }

        setIsGenerating(true);
        setError('');
        setGeneratedContent('');

        try {
            const response = await fetch('/api/generate-readme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName: data.projectInfo.name,
                    projectDescription: data.projectInfo.description || prompt,
                    techStack: data.techStack,
                    section: selectedSection,
                    additionalContext: prompt,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate content');
            }

            const result = await response.json();
            setGeneratedContent(result.content);
        } catch (err: any) {
            setError(err.message || 'Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleApply = () => {
        if (!generatedContent) return;

        switch (selectedSection) {
            case 'description':
                updateNestedData('projectInfo', 'description', generatedContent);
                break;
            case 'features':
                // Parse features and add them
                const featureLines = generatedContent.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
                featureLines.forEach(line => {
                    const match = line.match(/^[-•]\s*(.+?):\s*(.+)$/);
                    if (match) {
                        // This would need to call addFeature with parsed content
                    }
                });
                break;
            case 'installation':
                updateNestedData('installation', 'additionalSteps', generatedContent);
                break;
            case 'usage':
                updateNestedData('usage', 'quickStart', generatedContent);
                break;
            case 'contributing':
                updateNestedData('contributing', 'guidelines', generatedContent);
                break;
            default:
                // For full README, we'd need more complex parsing
                break;
        }

        setGeneratedContent('');
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden"
            style={{ height: 'calc(100vh - 140px)' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#a371f7]" />
                    <span className="font-semibold text-white">AI Assistant</span>
                    <span className="text-xs text-[#8b949e]">Powered by GLM-4</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-7 w-7 p-0 text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Section Selector */}
            <div className="p-4 border-b border-[#30363d]">
                <label className="text-xs text-[#8b949e] mb-2 block">Generate content for:</label>
                <div className="flex flex-wrap gap-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setSelectedSection(section.id)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${selectedSection === section.id
                                    ? 'bg-[#a371f7] text-white'
                                    : 'bg-[#21262d] text-[#8b949e] hover:text-white border border-[#30363d]'
                                }`}
                        >
                            {section.icon} {section.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Context Input */}
            <div className="p-4 border-b border-[#30363d]">
                <label className="text-xs text-[#8b949e] mb-2 block">
                    Describe your project or provide additional context:
                </label>
                <div className="relative">
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A React component library for building modern dashboards with charts, tables, and widgets..."
                        className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>

                {/* Quick suggestions */}
                <div className="mt-2 flex flex-wrap gap-1">
                    <span className="text-xs text-[#8b949e]">Try:</span>
                    {['CLI tool', 'React library', 'REST API', 'Full-stack app'].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setPrompt(prev => prev + ' ' + suggestion)}
                            className="text-xs px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] hover:bg-[#30363d] transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Generate Button */}
            <div className="px-4 py-3 border-b border-[#30363d]">
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-[#a371f7] to-[#8957e5] hover:from-[#8957e5] hover:to-[#7c3aed] text-white gap-2"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-4 h-4" />
                            Generate with AI
                        </>
                    )}
                </Button>

                {error && (
                    <p className="mt-2 text-xs text-red-400">{error}</p>
                )}
            </div>

            {/* Generated Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {generatedContent ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#8b949e]">Generated Content:</span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleCopy}
                                    className="h-7 px-2 text-[#8b949e] hover:text-white"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleApply}
                                    className="h-7 px-3 bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                                >
                                    Apply to Form
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
                            <pre className="text-sm text-[#e6edf3] whitespace-pre-wrap font-mono">
                                {generatedContent}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-center">
                        <div className="space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-[#484f58]" />
                            </div>
                            <p className="text-[#8b949e] text-sm">
                                Select a section and describe your project to generate professional README content
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
