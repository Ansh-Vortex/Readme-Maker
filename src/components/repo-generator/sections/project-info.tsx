'use client'

import React, { useState } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Package, Plus, X, Image, Link, Globe, ExternalLink } from 'lucide-react';
import { Badge } from '@/lib/repo-types';

const PRESET_BADGES = [
    { label: 'npm version', message: 'v1.0.0', color: 'CB3837', logoName: 'npm', style: 'for-the-badge' as const },
    { label: 'License', message: 'MIT', color: '0080ff', logoName: '', style: 'for-the-badge' as const },
    { label: 'Build', message: 'passing', color: 'brightgreen', logoName: 'github-actions', style: 'for-the-badge' as const },
    { label: 'TypeScript', message: '5.0+', color: '3178C6', logoName: 'typescript', style: 'for-the-badge' as const },
    { label: 'React', message: '18+', color: '61DAFB', logoName: 'react', style: 'for-the-badge' as const },
    { label: 'Node.js', message: '18+', color: '339933', logoName: 'nodedotjs', style: 'for-the-badge' as const },
    { label: 'PRs', message: 'welcome', color: 'brightgreen', logoName: '', style: 'for-the-badge' as const },
    { label: 'Downloads', message: '10k+', color: 'blue', logoName: 'npm', style: 'for-the-badge' as const },
];

export const ProjectInfoSection = () => {
    const { data, updateNestedData, addBadge, removeBadge, updateBadge, addTechStack, removeTechStack } = useRepoReadmeStore();
    const [newTech, setNewTech] = useState('');
    const [showBadgeForm, setShowBadgeForm] = useState(false);
    const [customBadge, setCustomBadge] = useState<Partial<Badge>>({
        label: '',
        message: '',
        color: '0080ff',
        style: 'for-the-badge',
        logoName: '',
    });

    const handleAddPresetBadge = (preset: typeof PRESET_BADGES[0]) => {
        addBadge({
            id: crypto.randomUUID(),
            ...preset,
            logoColor: 'white',
        });
    };

    const handleAddCustomBadge = () => {
        if (!customBadge.label || !customBadge.message) return;
        addBadge({
            id: crypto.randomUUID(),
            label: customBadge.label,
            message: customBadge.message,
            color: customBadge.color || '0080ff',
            style: customBadge.style || 'for-the-badge',
            logoName: customBadge.logoName,
            logoColor: 'white',
        });
        setCustomBadge({ label: '', message: '', color: '0080ff', style: 'for-the-badge', logoName: '' });
        setShowBadgeForm(false);
    };

    const handleAddTech = () => {
        if (newTech.trim()) {
            addTechStack(newTech.trim().toLowerCase());
            setNewTech('');
        }
    };

    const popularTech = ['react', 'nextjs', 'typescript', 'nodejs', 'python', 'tailwind', 'mongodb', 'postgres', 'docker', 'aws', 'vercel', 'vite'];

    return (
        <AccordionItem value="project-info" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#58a6ff]" />
                    <span>Project Info</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* Project Name */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Project Name *</Label>
                    <Input
                        value={data.projectInfo.name}
                        onChange={(e) => updateNestedData('projectInfo', 'name', e.target.value)}
                        placeholder="e.g., My Awesome Project"
                        className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                    />
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Tagline</Label>
                    <Input
                        value={data.projectInfo.tagline}
                        onChange={(e) => updateNestedData('projectInfo', 'tagline', e.target.value)}
                        placeholder="A short, catchy description"
                        className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Description</Label>
                    <Textarea
                        value={data.projectInfo.description}
                        onChange={(e) => updateNestedData('projectInfo', 'description', e.target.value)}
                        placeholder="Describe what your project does..."
                        className="min-h-[80px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>

                {/* Logo & Banner */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[#8b949e] flex items-center gap-1">
                            <Image className="w-3 h-3" /> Logo URL
                        </Label>
                        <Input
                            value={data.projectInfo.logoUrl}
                            onChange={(e) => updateNestedData('projectInfo', 'logoUrl', e.target.value)}
                            placeholder="https://..."
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[#8b949e] flex items-center gap-1">
                            <Image className="w-3 h-3" /> Banner URL
                        </Label>
                        <Input
                            value={data.projectInfo.bannerUrl}
                            onChange={(e) => updateNestedData('projectInfo', 'bannerUrl', e.target.value)}
                            placeholder="https://..."
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[#8b949e] flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Website URL
                        </Label>
                        <Input
                            value={data.projectInfo.websiteUrl}
                            onChange={(e) => updateNestedData('projectInfo', 'websiteUrl', e.target.value)}
                            placeholder="https://..."
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[#8b949e] flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Demo URL
                        </Label>
                        <Input
                            value={data.projectInfo.demoUrl}
                            onChange={(e) => updateNestedData('projectInfo', 'demoUrl', e.target.value)}
                            placeholder="https://..."
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Tech Stack (for badges)</Label>
                    <div className="flex gap-2">
                        <Input
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTech()}
                            placeholder="e.g., react, nodejs..."
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                        <Button onClick={handleAddTech} size="sm" className="bg-[#238636] hover:bg-[#2ea043] text-white">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* Quick add buttons */}
                    <div className="flex flex-wrap gap-1 mt-2">
                        {popularTech.filter(t => !data.techStack.includes(t)).slice(0, 8).map((tech) => (
                            <button
                                key={tech}
                                onClick={() => addTechStack(tech)}
                                className="px-2 py-0.5 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                            >
                                + {tech}
                            </button>
                        ))}
                    </div>
                    {data.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-xs rounded-md bg-[#238636]/20 text-[#3fb950] flex items-center gap-1"
                                >
                                    {tech}
                                    <button onClick={() => removeTechStack(tech)} className="hover:text-red-400">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Badges */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Badges</Label>

                    {/* Current badges */}
                    {data.projectInfo.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {data.projectInfo.badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className="flex items-center gap-1 px-2 py-1 rounded bg-[#21262d] text-xs"
                                >
                                    <span className="text-[#e6edf3]">{badge.label}: {badge.message}</span>
                                    <button onClick={() => removeBadge(badge.id)} className="text-[#8b949e] hover:text-red-400">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Preset badges */}
                    <div className="flex flex-wrap gap-1">
                        {PRESET_BADGES.map((preset, i) => (
                            <button
                                key={i}
                                onClick={() => handleAddPresetBadge(preset)}
                                className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                            >
                                + {preset.label}
                            </button>
                        ))}
                    </div>

                    {/* Custom badge form */}
                    {showBadgeForm ? (
                        <div className="mt-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={customBadge.label}
                                    onChange={(e) => setCustomBadge({ ...customBadge, label: e.target.value })}
                                    placeholder="Label"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                                <Input
                                    value={customBadge.message}
                                    onChange={(e) => setCustomBadge({ ...customBadge, message: e.target.value })}
                                    placeholder="Message"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={customBadge.color}
                                    onChange={(e) => setCustomBadge({ ...customBadge, color: e.target.value })}
                                    placeholder="Color (hex without #)"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                                <Input
                                    value={customBadge.logoName}
                                    onChange={(e) => setCustomBadge({ ...customBadge, logoName: e.target.value })}
                                    placeholder="Logo (simpleicons.org)"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleAddCustomBadge} size="sm" className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs">
                                    Add Badge
                                </Button>
                                <Button onClick={() => setShowBadgeForm(false)} size="sm" variant="ghost" className="text-[#8b949e] text-xs">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setShowBadgeForm(true)}
                            size="sm"
                            variant="ghost"
                            className="mt-2 text-[#58a6ff] hover:text-[#79c0ff] text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Custom Badge
                        </Button>
                    )}
                </div>

                {/* Author Info */}
                <div className="space-y-2 pt-4 border-t border-[#30363d]">
                    <Label className="text-[#8b949e]">Author</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            value={data.author.name}
                            onChange={(e) => updateNestedData('author', 'name', e.target.value)}
                            placeholder="Your name"
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                        <Input
                            value={data.author.github}
                            onChange={(e) => updateNestedData('author', 'github', e.target.value)}
                            placeholder="GitHub username"
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            value={data.author.twitter}
                            onChange={(e) => updateNestedData('author', 'twitter', e.target.value)}
                            placeholder="Twitter handle"
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                        <Input
                            value={data.author.website}
                            onChange={(e) => updateNestedData('author', 'website', e.target.value)}
                            placeholder="Website URL"
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
