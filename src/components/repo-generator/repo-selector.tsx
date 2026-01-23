'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
    Search, Loader2, Lock, Globe, Star, GitFork,
    Calendar, ArrowRight, FolderGit2, RefreshCw,
    Sparkles, AlertCircle
} from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    fullName: string;
    description: string;
    private: boolean;
    language: string;
    stars: number;
    forks: number;
    updatedAt: string;
    topics: string[];
    htmlUrl: string;
}

interface RepoSelectorProps {
    onSelect: (repo: Repo) => void;
    onBack: () => void;
}

export const RepoSelector = ({ onSelect, onBack }: RepoSelectorProps) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');

    const fetchRepos = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/repos');
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            const data = await response.json();
            setRepos(data.repos);
        } catch (err: any) {
            setError(err.message || 'Failed to load repositories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    const filteredRepos = repos.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) ||
            (repo.description?.toLowerCase().includes(search.toLowerCase()));

        const matchesFilter = filter === 'all' ||
            (filter === 'public' && !repo.private) ||
            (filter === 'private' && repo.private);

        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full bg-[#0d1117] flex flex-col"
        >
            {/* Header */}
            <div className="px-6 py-4 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <FolderGit2 className="w-6 h-6 text-[#a371f7]" />
                        <div>
                            <h2 className="text-xl font-semibold text-white">Select a Repository</h2>
                            <p className="text-sm text-[#8b949e]">Choose a repo to generate its README with AI</p>
                        </div>
                    </div>
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        className="text-[#8b949e] hover:text-white"
                    >
                        Cancel
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484f58]" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Find a repository..."
                            className="pl-10 bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                    <div className="flex bg-[#21262d] rounded-md border border-[#30363d] overflow-hidden">
                        {(['all', 'public', 'private'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${filter === f
                                        ? 'bg-[#0d1117] text-white'
                                        : 'text-[#8b949e] hover:text-white'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                    <Button
                        onClick={fetchRepos}
                        variant="ghost"
                        size="icon"
                        className="text-[#8b949e] hover:text-white border border-[#30363d]"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <Loader2 className="w-8 h-8 text-[#a371f7] animate-spin" />
                        <p className="text-[#8b949e]">Loading your repositories...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                        <p className="text-red-400">{error}</p>
                        <Button onClick={fetchRepos} className="bg-[#21262d] hover:bg-[#30363d] text-white">
                            Try Again
                        </Button>
                    </div>
                ) : filteredRepos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <FolderGit2 className="w-8 h-8 text-[#484f58]" />
                        <p className="text-[#8b949e]">
                            {search ? 'No repositories match your search' : 'No repositories found'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {filteredRepos.map((repo) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => onSelect(repo)}
                                className="group p-4 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#a371f7] cursor-pointer transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {repo.private ? (
                                                <Lock className="w-4 h-4 text-[#8b949e]" />
                                            ) : (
                                                <Globe className="w-4 h-4 text-[#8b949e]" />
                                            )}
                                            <span className="font-semibold text-[#58a6ff] group-hover:underline">
                                                {repo.name}
                                            </span>
                                            {repo.private && (
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-[#30363d] text-[#8b949e]">
                                                    Private
                                                </span>
                                            )}
                                        </div>

                                        {repo.description && (
                                            <p className="text-sm text-[#8b949e] mb-2 line-clamp-2">
                                                {repo.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                                            {repo.language && (
                                                <span className="flex items-center gap-1">
                                                    <span className="w-3 h-3 rounded-full bg-[#f1e05a]" />
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                {repo.stars}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitFork className="w-3 h-3" />
                                                {repo.forks}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(repo.updatedAt)}
                                            </span>
                                        </div>

                                        {repo.topics.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {repo.topics.slice(0, 5).map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="px-2 py-0.5 text-xs rounded-full bg-[#388bfd]/20 text-[#58a6ff]"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#a371f7] text-white text-sm">
                                            <Sparkles className="w-3 h-3" />
                                            Generate
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between text-sm">
                <span className="text-[#8b949e]">
                    {filteredRepos.length} {filteredRepos.length === 1 ? 'repository' : 'repositories'}
                </span>
                <span className="text-[#484f58]">
                    Click a repository to analyze and generate README
                </span>
            </div>
        </motion.div>
    );
};
