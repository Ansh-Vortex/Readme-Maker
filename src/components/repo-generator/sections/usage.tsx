'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Code, Plus, X, Trash2 } from 'lucide-react';

const LANGUAGES = [
    'javascript', 'typescript', 'python', 'bash', 'json', 'jsx', 'tsx',
    'html', 'css', 'go', 'rust', 'java', 'c', 'cpp', 'csharp', 'ruby', 'php'
];

export const UsageSection = () => {
    const { data, updateNestedData, addCodeExample, removeCodeExample, updateCodeExample } = useRepoReadmeStore();

    return (
        <AccordionItem value="usage" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#79c0ff]" />
                    <span>Usage & Examples</span>
                    <Switch
                        checked={data.usage.enabled}
                        onCheckedChange={(checked) => updateNestedData('usage', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* Quick Start */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Quick Start (markdown)</Label>
                    <Textarea
                        value={data.usage.quickStart}
                        onChange={(e) => updateNestedData('usage', 'quickStart', e.target.value)}
                        placeholder="Describe how to quickly get started with your project..."
                        className="min-h-[80px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>

                {/* Code Examples */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-[#8b949e]">Code Examples</Label>
                        <Button
                            onClick={addCodeExample}
                            size="sm"
                            className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add Example
                        </Button>
                    </div>

                    {data.usage.examples.length === 0 && (
                        <div className="text-center py-6 text-[#484f58] text-sm">
                            No examples yet. Click "Add Example" to create one.
                        </div>
                    )}

                    {data.usage.examples.map((example, index) => (
                        <div
                            key={example.id}
                            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#8b949e]">Example #{index + 1}</span>
                                <Button
                                    onClick={() => removeCodeExample(example.id)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={example.title}
                                    onChange={(e) => updateCodeExample(example.id, { title: e.target.value })}
                                    placeholder="Example title"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                                <select
                                    value={example.language}
                                    onChange={(e) => updateCodeExample(example.id, { language: e.target.value })}
                                    className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white text-sm"
                                >
                                    {LANGUAGES.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>

                            <Textarea
                                value={example.code}
                                onChange={(e) => updateCodeExample(example.id, { code: e.target.value })}
                                placeholder="// Your code here"
                                className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] font-mono text-sm resize-none"
                            />

                            <div className="space-y-1">
                                <Label className="text-[#8b949e] text-xs">Output (optional)</Label>
                                <Textarea
                                    value={example.output || ''}
                                    onChange={(e) => updateCodeExample(example.id, { output: e.target.value })}
                                    placeholder="Expected output..."
                                    className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] font-mono text-sm resize-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
