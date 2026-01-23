'use client'

import React from 'react';
import { GeneratorForm } from './form';
import { Preview } from './preview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, Star, Instagram, Send, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface GeneratorProps {
    onBack?: () => void;
}

export const Generator = ({ onBack }: GeneratorProps) => {
    const { data: session } = useSession();
    const username = session ? (session as any).username : null;

    return (
        <div className="w-full h-full overflow-hidden bg-[#0d1117] relative flex flex-col">
            {/* GitHub-style Header */}
            <header className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex-shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="text-[#8b949e] hover:text-white hover:bg-[#21262d] gap-2 h-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    )}
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-white" />
                        <span className="font-semibold text-white">README.md Maker</span>
                        {username && (
                            <span className="text-[#8b949e] text-sm">/ @{username}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
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
                <div className="border-r border-[#30363d] overflow-hidden">
                    <GeneratorForm />
                </div>
                <div className="overflow-hidden">
                    <Preview />
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
