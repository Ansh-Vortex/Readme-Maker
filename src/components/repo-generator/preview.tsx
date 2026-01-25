'use client'

import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Button } from '@/components/ui/button';
import { Copy, Download, RefreshCw, Code, Eye, Check, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const RepoPreview = () => {
    const { markdown, reset, data, regenerateMarkdown } = useRepoReadmeStore();
    const [copied, setCopied] = useState(false);
    const [showRaw, setShowRaw] = useState(false);

    // Regenerate markdown on mount
    useEffect(() => {
        regenerateMarkdown();
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    const hasProjectName = data.projectInfo.name && data.projectInfo.name.length > 0;

    // Memoized custom components for optimized rendering
    const customComponents = useMemo(() => ({
        img: ({ src, alt, ...props }: any) => (
            <img
                src={src}
                alt={alt || ''}
                loading="eager"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'inline-block',
                    margin: '4px'
                }}
                {...props}
            />
        ),
        p: ({ children, ...props }: any) => (
            <p style={{ margin: '8px 0' }} {...props}>{children}</p>
        ),
        a: ({ href, children, ...props }: any) => (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#58a6ff', textDecoration: 'none' }}
                {...props}
            >
                {children}
            </a>
        ),
        div: ({ node, children, ...props }: any) => (
            <div
                style={{
                    textAlign: props.align === 'center' ? 'center' : 'left',
                    margin: '16px 0'
                }}
                {...props}
            >
                {children}
            </div>
        ),
        // Enhanced code blocks with syntax highlighting
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (inline) {
                return (
                    <code className="inline-code" {...props}>
                        {children}
                    </code>
                );
            }

            return (
                <code className={`code-block language-${language}`} {...props}>
                    {children}
                </code>
            );
        },
        pre: ({ children, ...props }: any) => (
            <pre className="code-pre" {...props}>
                {children}
            </pre>
        ),
    }), []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col rounded-2xl overflow-hidden border border-[#30363d]"
            style={{ height: 'calc(100vh - 140px)' }}
        >
            {/* GitHub-style Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#8b949e]" />
                        <span className="text-sm font-semibold text-[#e6edf3]">README.md</span>
                    </div>
                    <div className="flex items-center bg-[#21262d] rounded-md border border-[#30363d] overflow-hidden">
                        <button
                            onClick={() => setShowRaw(false)}
                            className={`px-3 py-1 text-xs font-medium transition-all flex items-center gap-1.5 ${!showRaw ? 'bg-[#0d1117] text-[#e6edf3]' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
                        >
                            <Eye className="w-3 h-3" />
                            Preview
                        </button>
                        <button
                            onClick={() => setShowRaw(true)}
                            className={`px-3 py-1 text-xs font-medium transition-all flex items-center gap-1.5 border-l border-[#30363d] ${showRaw ? 'bg-[#0d1117] text-[#e6edf3]' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
                        >
                            <Code className="w-3 h-3" />
                            Code
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={reset}
                        className="h-7 px-2 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleCopy}
                        className="h-7 px-3 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] gap-1.5"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleDownload}
                        className="h-7 px-3 bg-[#238636] hover:bg-[#2ea043] text-white gap-1.5"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span className="text-xs">Download</span>
                    </Button>
                </div>
            </div>

            {/* Project Name Warning */}
            {!hasProjectName && (
                <div className="px-4 py-2 bg-[#3d1d00] border-b border-[#8a4b08] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#d29922]" />
                    <span className="text-xs text-[#d29922]">Enter a project name in Project Info section to get started</span>
                </div>
            )}

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar bg-[#0d1117]">
                {showRaw ? (
                    <pre className="p-6 font-mono text-sm text-[#e6edf3] whitespace-pre-wrap leading-relaxed">
                        {markdown}
                    </pre>
                ) : (
                    <div className="readme-body p-6" style={{ color: '#e6edf3' }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={customComponents}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
