'use client'

import React, { useState } from 'react';
import { RepoGeneratorForm } from './form';
import { RepoPreview } from './preview';
import { AIAssistant } from './ai-assistant';
import { RepoSelector } from './repo-selector';
import { RepoAnalyzer } from './repo-analyzer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, Star, Instagram, Send, FileText, Sparkles, FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn } from 'next-auth/react';

interface RepoGeneratorProps {
    onBack?: () => void;
}

type Step = 'auth' | 'select' | 'analyze' | 'customize';

interface SelectedRepo {
    fullName: string;
    name: string;
}

export const RepoGenerator = ({ onBack }: RepoGeneratorProps) => {
    const { data: session, status } = useSession();
    const [step, setStep] = useState<Step>('auth');
    const [selectedRepo, setSelectedRepo] = useState<SelectedRepo | null>(null);
    const [showAI, setShowAI] = useState(false);

    // Check auth status and set initial step
    React.useEffect(() => {
        if (status === 'authenticated') {
            if (step === 'auth') {
                setStep('select');
            }
        } else if (status === 'unauthenticated') {
            setStep('auth');
        }
    }, [status]);

    const handleRepoSelect = (repo: any) => {
        setSelectedRepo({ fullName: repo.fullName, name: repo.name });
        setStep('analyze');
    };

    const handleAnalysisComplete = () => {
        setStep('customize');
    };

    const handleBackToSelect = () => {
        setSelectedRepo(null);
        setStep('select');
    };

    // Auth required screen
    if (step === 'auth' || status === 'loading') {
        return (
            <div className="w-full h-full bg-[#0d1117] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full p-8 text-center"
                >
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#a371f7]/20 to-[#8957e5]/20 flex items-center justify-center mb-6 border border-[#a371f7]/30">
                        <FolderGit2 className="w-10 h-10 text-[#a371f7]" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">
                        Repo README Generator
                    </h2>
                    <p className="text-[#8b949e] mb-6">
                        Sign in with GitHub to access your repositories and generate professional README files with AI.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-left">
                            <div className="w-8 h-8 rounded-full bg-[#238636]/20 flex items-center justify-center">
                                <FolderGit2 className="w-4 h-4 text-[#3fb950]" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">Access All Repos</p>
                                <p className="text-xs text-[#8b949e]">Public & private repositories</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-left">
                            <div className="w-8 h-8 rounded-full bg-[#a371f7]/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-[#a371f7]" />
                            </div>
                            <div>
                                <p className="text-sm text-white font-medium">AI Analysis</p>
                                <p className="text-xs text-[#8b949e]">Auto-detect languages, dependencies & more</p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => signIn('github')}
                        disabled={status === 'loading'}
                        className="w-full mt-6 bg-[#238636] hover:bg-[#2ea043] text-white gap-2 py-6 text-lg"
                    >
                        <Github className="w-5 h-5" />
                        Sign in with GitHub
                    </Button>

                    {onBack && (
                        <Button
                            onClick={onBack}
                            variant="ghost"
                            className="mt-4 text-[#8b949e] hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    )}
                </motion.div>
            </div>
        );
    }

    // Repo selection screen
    if (step === 'select') {
        return <RepoSelector onSelect={handleRepoSelect} onBack={onBack || (() => { })} />;
    }

    // Analysis screen
    if (step === 'analyze' && selectedRepo) {
        return (
            <RepoAnalyzer
                repo={selectedRepo}
                onComplete={handleAnalysisComplete}
                onBack={handleBackToSelect}
            />
        );
    }

    // Customize screen (main editor)
    return (
        <div className="w-full h-full overflow-hidden bg-[#0d1117] relative flex flex-col">
            {/* GitHub-style Header */}
            <header className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex-shrink-0">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToSelect}
                        className="text-[#8b949e] hover:text-white hover:bg-[#21262d] gap-2 h-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Change Repo
                    </Button>
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-white" />
                        <span className="font-semibold text-white">Repo README Maker</span>
                        {selectedRepo && (
                            <span className="text-[#8b949e] text-sm">/ {selectedRepo.name}</span>
                        )}
                        <span className="px-2 py-0.5 text-xs bg-[#238636]/20 text-[#3fb950] rounded-full border border-[#238636]/50">
                            AI Powered
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        onClick={() => setShowAI(!showAI)}
                        className={`h-8 px-3 gap-1.5 ${showAI
                            ? 'bg-[#a371f7] hover:bg-[#8957e5] text-white'
                            : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d]'
                            }`}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-xs">AI Assistant</span>
                    </Button>
                    <a
                        href="https://github.com/Ansh-Vortex/Readme-Maker"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors"
                    >
                        <Star className="w-3.5 h-3.5 text-yellow-500" />
                        Star
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 grid lg:grid-cols-2 gap-0 min-h-0 overflow-hidden">
                <div className="border-r border-[#30363d] overflow-hidden flex flex-col">
                    <RepoGeneratorForm />
                </div>
                <div className="overflow-hidden flex flex-col">
                    <AnimatePresence mode="wait">
                        {showAI ? (
                            <motion.div
                                key="ai"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <AIAssistant onClose={() => setShowAI(false)} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <RepoPreview />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <footer className="px-4 py-2 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between text-xs">
                <div className="flex items-center gap-4 text-[#8b949e]">
                    <span>Made by <strong className="text-white">Ansh</strong></span>
                    <div className="flex items-center gap-2">
                        <a href="https://instagram.com/anshvortex" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-colors">
                            <Instagram className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://t.me/highoncodes" target="_blank" rel="noopener noreferrer" className="hover:text-[#2CA5E0] transition-colors">
                            <Send className="w-3.5 h-3.5" />
                        </a>
                        <a href="https://github.com/Ansh-Vortex" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Github className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
                <a
                    href="https://buymeachai.ezee.li/anshvortex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b949e] hover:text-orange-400 transition-colors"
                >
                    ☕ Buy Me A Chai
                </a>
            </footer>
        </div>
    );
};
