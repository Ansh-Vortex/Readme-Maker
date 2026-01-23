'use client'

import React, { useState } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Download, Plus, X } from 'lucide-react';

export const InstallationSection = () => {
    const { data, updateNestedData, addPrerequisite, removePrerequisite } = useRepoReadmeStore();
    const [newPrereq, setNewPrereq] = useState('');

    const handleAddPrereq = () => {
        if (newPrereq.trim()) {
            addPrerequisite(newPrereq.trim());
            setNewPrereq('');
        }
    };

    const packageManagers = [
        { id: 'npm', label: 'npm', icon: '📦' },
        { id: 'yarn', label: 'yarn', icon: '🧶' },
        { id: 'pnpm', label: 'pnpm', icon: '⚡' },
        { id: 'bun', label: 'bun', icon: '🍞' },
    ];

    const commonPrereqs = ['Node.js >= 18', 'npm >= 9', 'Git', 'Docker', 'Python >= 3.8'];

    return (
        <AccordionItem value="installation" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#3fb950]" />
                    <span>Installation</span>
                    <Switch
                        checked={data.installation.enabled}
                        onCheckedChange={(checked) => updateNestedData('installation', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* Package Manager */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Package Manager</Label>
                    <div className="flex gap-2">
                        {packageManagers.map((pm) => (
                            <button
                                key={pm.id}
                                onClick={() => updateNestedData('installation', 'packageManager', pm.id)}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${data.installation.packageManager === pm.id
                                        ? 'bg-[#238636] text-white'
                                        : 'bg-[#21262d] text-[#8b949e] hover:text-white border border-[#30363d]'
                                    }`}
                            >
                                {pm.icon} {pm.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Package Name */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Package Name (leave empty to use project name)</Label>
                    <Input
                        value={data.installation.packageName}
                        onChange={(e) => updateNestedData('installation', 'packageName', e.target.value)}
                        placeholder="my-package"
                        className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] font-mono"
                    />
                </div>

                {/* Prerequisites */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Prerequisites</Label>
                    <div className="flex gap-2">
                        <Input
                            value={newPrereq}
                            onChange={(e) => setNewPrereq(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddPrereq()}
                            placeholder="e.g., Node.js >= 18"
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                        <Button onClick={handleAddPrereq} size="sm" className="bg-[#238636] hover:bg-[#2ea043] text-white">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Quick add */}
                    <div className="flex flex-wrap gap-1 mt-2">
                        {commonPrereqs.filter(p => !data.installation.prerequisites.includes(p)).map((prereq) => (
                            <button
                                key={prereq}
                                onClick={() => addPrerequisite(prereq)}
                                className="px-2 py-0.5 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                            >
                                + {prereq}
                            </button>
                        ))}
                    </div>

                    {data.installation.prerequisites.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.installation.prerequisites.map((prereq, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs rounded-md bg-[#21262d] text-[#e6edf3] flex items-center gap-1"
                                >
                                    {prereq}
                                    <button onClick={() => removePrerequisite(prereq)} className="hover:text-red-400">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Additional Install Commands */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Additional Commands (optional)</Label>
                    <Textarea
                        value={data.installation.installCommands}
                        onChange={(e) => updateNestedData('installation', 'installCommands', e.target.value)}
                        placeholder="# Clone the repository&#10;git clone https://github.com/user/repo.git&#10;cd repo&#10;&#10;# Install dependencies&#10;npm install"
                        className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] font-mono text-sm resize-none"
                    />
                </div>

                {/* Additional Steps */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Additional Setup Steps (markdown)</Label>
                    <Textarea
                        value={data.installation.additionalSteps}
                        onChange={(e) => updateNestedData('installation', 'additionalSteps', e.target.value)}
                        placeholder="Any additional configuration or setup instructions..."
                        className="min-h-[80px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
