'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSection } from '../form-section';
import { Lightbulb, Plus, Trash2, ExternalLink, Github, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// Working themes for project cards
const PROJECT_THEMES = ['tokyonight', 'radical', 'merko', 'gruvbox', 'dark', 'dracula', 'nord', 'onedark', 'cobalt', 'synthwave', 'highcontrast', 'transparent'];

export const ProjectsSection = () => {
    const { data, addProject, removeProject, updateProject, updateNestedData } = useReadmeStore();
    const { projects } = data;
    const projectTheme = (data as any).projectTheme || 'tokyonight';

    return (
        <FormSection value="projects" title="Featured Projects" icon={<Lightbulb className="w-4 h-4" />}>
            <div className="space-y-3">
                {/* Project Card Theme Selector */}
                <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
                    <div className="flex items-center gap-2 mb-2">
                        <Palette className="w-4 h-4 text-[#a371f7]" />
                        <Label className="text-white/80 text-sm">Card Theme</Label>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {PROJECT_THEMES.map((t) => (
                            <button
                                key={t}
                                onClick={() => updateNestedData('extras' as any, 'projectTheme', t)}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${projectTheme === t ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50' : 'bg-white/[0.03] text-white/40 hover:text-white/70 border border-transparent'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-6 border border-dashed border-[#30363d] rounded-lg bg-[#0d1117]">
                        <Github className="w-8 h-8 mx-auto mb-2 text-[#484f58]" />
                        <p className="text-[#8b949e] text-sm">No projects yet</p>
                        <p className="text-[#484f58] text-xs">Add your best work!</p>
                    </div>
                )}

                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="p-3 border border-[#30363d] rounded-lg bg-[#161b22] relative group"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 text-[#f85149] hover:text-white hover:bg-[#f85149]/20 opacity-0 group-hover:opacity-100"
                            onClick={() => removeProject(project.id)}
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>

                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={project.name}
                                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                    placeholder="Project Name"
                                    className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] h-8 text-sm"
                                />
                                <Input
                                    value={project.link}
                                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                    placeholder="https://github.com/user/repo"
                                    className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] h-8 text-sm"
                                />
                            </div>
                            <Input
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                placeholder="Brief description..."
                                className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] h-8 text-sm"
                            />

                            {/* Type indicator */}
                            <div className="flex items-center gap-2 text-[10px] text-[#8b949e]">
                                {project.link?.includes('github.com') ? (
                                    <span className="flex items-center gap-1 text-green-400">
                                        <Github className="w-3 h-3" /> GitHub Card
                                    </span>
                                ) : project.link ? (
                                    <span className="flex items-center gap-1 text-blue-400">
                                        <Globe className="w-3 h-3" /> External Link
                                    </span>
                                ) : (
                                    <span className="text-[#484f58]">Add a link for card preview</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-dashed border-[#30363d] bg-transparent text-[#8b949e] hover:text-white hover:bg-[#21262d] hover:border-[#388bfd]"
                    onClick={addProject}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>
        </FormSection>
    );
};
