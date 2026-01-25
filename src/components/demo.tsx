'use client'

import { Spotlight } from "@/components/ui/spotlight"
import { useState } from "react";
import { Generator } from "@/components/generator";
import { RepoGenerator } from "@/components/repo-generator";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { Github, LogOut, Loader2, Star, Instagram, Send, FileText, Terminal, GitBranch, Code2, Braces, User, Package, Sparkles, ArrowRight, FolderGit2 } from "lucide-react";

type GeneratorType = 'none' | 'profile' | 'repo';

export function SplineSceneBasic() {
    const [showGenerator, setShowGenerator] = useState<GeneratorType>('none');
    const { data: session, status } = useSession();

    const handleGetStarted = (type: 'profile' | 'repo') => {
        if (!session && type === 'profile') {
            signIn('github');
        } else {
            setShowGenerator(type);
        }
    };

    return (
        <div className="w-full h-screen bg-[#0d1117] relative overflow-hidden flex flex-col">
            {/* Grid background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#238636]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1f6feb]/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[#a371f7]/10 rounded-full blur-[100px]" />

            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <AnimatePresence mode="wait">
                {showGenerator === 'none' ? (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full relative z-10"
                    >
                        {/* GitHub-style Header */}
                        <header className="flex items-center justify-between px-6 py-3 bg-[#010409] border-b border-[#21262d]">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
                                    <span className="text-lg font-semibold text-white">README.md Maker</span>
                                </div>
                                <nav className="hidden md:flex items-center gap-4 text-sm text-[#8b949e]">
                                    <a href="#" className="hover:text-white transition-colors">Features</a>
                                    <a href="https://github.com/Ansh-Vortex/Readme-Maker" target="_blank" className="hover:text-white transition-colors">Docs</a>
                                </nav>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://github.com/Ansh-Vortex/Readme-Maker"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-sm font-medium transition-colors"
                                >
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    Star
                                </a>

                                {status === 'loading' ? (
                                    <div className="flex items-center gap-2 px-3 py-1.5 text-[#8b949e]">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </div>
                                ) : session ? (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#238636]/20 border border-[#238636]/50">
                                            <img
                                                src={(session as any).avatar || (session.user?.image)}
                                                alt="avatar"
                                                className="w-5 h-5 rounded-full"
                                            />
                                            <span className="text-sm text-[#3fb950]">
                                                {(session as any).username || session.user?.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-[#21262d]"
                                        >
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => signIn('github')}
                                        className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        Sign in
                                    </button>
                                )}
                            </div>
                        </header>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-20">
                            {/* Terminal-style tag */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-6 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] font-mono text-sm text-[#8b949e]"
                            >
                                <span className="text-[#7ee787]">$</span> npx create-readme <span className="text-[#79c0ff]">--profile</span> <span className="text-[#a371f7]">--repo</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-bold text-white text-center leading-tight"
                            >
                                Create <span className="text-[#238636]">Professional</span>
                                <br />
                                <span className="bg-gradient-to-r from-[#58a6ff] to-[#a371f7] bg-clip-text text-transparent">
                                    README Files
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 text-[#8b949e] max-w-2xl text-lg leading-relaxed text-center"
                            >
                                The fastest way to create stunning READMEs for your GitHub profile and repositories. Visual editor, AI-powered suggestions, live preview.
                            </motion.p>

                            {/* Two Options Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-10 grid md:grid-cols-2 gap-6 w-full max-w-3xl"
                            >
                                {/* Profile README Card */}
                                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] hover:border-[#238636] transition-all duration-300 cursor-pointer"
                                    onClick={() => handleGetStarted('profile')}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#238636]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-[#238636]/20 border border-[#238636]/30">
                                                <User className="w-6 h-6 text-[#3fb950]" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-[#484f58] group-hover:text-[#3fb950] group-hover:translate-x-1 transition-all" />
                                        </div>

                                        <h3 className="text-xl font-semibold text-white mb-2">Profile README</h3>
                                        <p className="text-[#8b949e] text-sm mb-4">
                                            Create an eye-catching GitHub profile with stats, skills, and social links.
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e]">
                                                <Terminal className="w-3 h-3 inline mr-1" />GitHub Stats
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e]">
                                                <Braces className="w-3 h-3 inline mr-1" />Skill Badges
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e]">
                                                <GitBranch className="w-3 h-3 inline mr-1" />Projects
                                            </span>
                                        </div>

                                        <button className="mt-4 w-full py-2.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-medium transition-colors flex items-center justify-center gap-2">
                                            <Github className="w-4 h-4" />
                                            {session ? 'Create Profile README' : 'Sign in to Start'}
                                        </button>
                                    </div>
                                </div>

                                {/* Repo README Card */}
                                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] hover:border-[#a371f7] transition-all duration-300 cursor-pointer"
                                    onClick={() => handleGetStarted('repo')}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#a371f7]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* AI Badge */}
                                    <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r from-[#a371f7] to-[#8957e5] text-white text-xs font-medium flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        AI Powered
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-lg bg-[#a371f7]/20 border border-[#a371f7]/30">
                                                <FolderGit2 className="w-6 h-6 text-[#a371f7]" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-[#484f58] group-hover:text-[#a371f7] group-hover:translate-x-1 transition-all" />
                                        </div>

                                        <h3 className="text-xl font-semibold text-white mb-2">Repo README</h3>
                                        <p className="text-[#8b949e] text-sm mb-4">
                                            Generate professional documentation for your repositories with AI assistance.
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e]">
                                                <Package className="w-3 h-3 inline mr-1" />Installation
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e]">
                                                <Code2 className="w-3 h-3 inline mr-1" />API Docs
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e]">
                                                <Sparkles className="w-3 h-3 inline mr-1" />Features
                                            </span>
                                        </div>

                                        <button className="mt-4 w-full py-2.5 rounded-md bg-gradient-to-r from-[#a371f7] to-[#8957e5] hover:from-[#8957e5] hover:to-[#7c3aed] text-white font-medium transition-all flex items-center justify-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Create Repo README
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Features Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
                            >
                                {[
                                    { icon: '⚡', title: 'Instant Preview', desc: 'See changes in real-time' },
                                    { icon: '🤖', title: 'AI Powered', desc: 'Smart content generation' },
                                    { icon: '🎨', title: 'Beautiful Design', desc: 'Professional templates' },
                                    { icon: '📦', title: 'Export Ready', desc: 'Copy or download instantly' },
                                ].map((feature, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-[#161b22]/50 border border-[#30363d] text-center hover:border-[#58a6ff] transition-colors">
                                        <div className="text-2xl mb-2">{feature.icon}</div>
                                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                                        <p className="text-[#8b949e] text-xs mt-1">{feature.desc}</p>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-8"
                            >
                                <a href="https://buymeachai.ezee.li/anshvortex" target="_blank" rel="noopener noreferrer">
                                    <img src="https://buymeachai.ezee.li/assets/images/buymeachai-button.png" alt="Buy Me A Chai" width="140" className="opacity-80 hover:opacity-100 transition-opacity" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Enhanced Footer */}
                        <footer className="bg-[#010409] border-t border-[#21262d]">
                            <div className="max-w-6xl mx-auto px-6 py-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    {/* Left - Logo & Links */}
                                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                                        <div className="flex items-center gap-2">
                                            <img src="/favicon.png" alt="Logo" className="w-6 h-6 opacity-70" />
                                            <span className="text-[#8b949e] text-sm">README.md Maker</span>
                                        </div>
                                        <nav className="flex items-center gap-4 text-xs text-[#8b949e]">
                                            <a href="#" className="hover:text-[#58a6ff] transition-colors">Features</a>
                                            <a href="https://github.com/Ansh-Vortex/Readme-Maker" target="_blank" className="hover:text-[#58a6ff] transition-colors">GitHub</a>
                                            <a href="https://github.com/Ansh-Vortex/Readme-Maker/issues" target="_blank" className="hover:text-[#58a6ff] transition-colors">Report Bug</a>
                                            <a href="https://buymeachai.ezee.li/anshvortex" target="_blank" className="hover:text-[#58a6ff] transition-colors">Donate</a>
                                        </nav>
                                    </div>

                                    {/* Center - Social Links */}
                                    <div className="flex items-center gap-4">
                                        <a href="https://instagram.com/anshvortex" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#E4405F] transition-all">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a href="https://t.me/highoncodes" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#2CA5E0] transition-all">
                                            <Send className="w-4 h-4" />
                                        </a>
                                        <a href="https://github.com/Ansh-Vortex" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-all">
                                            <Github className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* Right - Version & Made by */}
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="px-2 py-1 rounded bg-[#21262d] text-[#8b949e] font-mono">v2.0.0</span>
                                        <span className="text-[#8b949e]">
                                            Made with <span className="text-red-500">♥</span> by <a href="https://github.com/Ansh-Vortex" target="_blank" className="text-white hover:text-[#58a6ff] transition-colors font-medium">Ansh</a>
                                        </span>
                                    </div>
                                </div>

                                {/* Copyright */}
                                <div className="mt-4 pt-4 border-t border-[#21262d] text-center">
                                    <p className="text-[#484f58] text-xs">
                                        © 2025 README.md Maker. Open source under MIT License.
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </motion.div>
                ) : showGenerator === 'profile' ? (
                    <motion.div
                        key="profile-generator"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-30"
                    >
                        <Generator onBack={() => setShowGenerator('none')} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="repo-generator"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-30"
                    >
                        <RepoGenerator onBack={() => setShowGenerator('none')} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
