'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { MoreHorizontal, Plus, Trash2, CheckSquare, HelpCircle, ListTodo, Heart } from 'lucide-react';

export const ExtrasSection = () => {
    const {
        data,
        updateNestedData,
        addRoadmapItem,
        removeRoadmapItem,
        updateRoadmapItem,
        addFaqItem,
        removeFaqItem,
        updateFaqItem
    } = useRepoReadmeStore();

    return (
        <AccordionItem value="extras" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <MoreHorizontal className="w-4 h-4 text-[#8b949e]" />
                    <span>Extras</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-6 bg-[#0d1117]">
                {/* Table of Contents */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-[#8b949e]" />
                        <Label className="text-[#8b949e]">Show Table of Contents</Label>
                    </div>
                    <Switch
                        checked={data.extras.showTableOfContents}
                        onCheckedChange={(checked) => updateNestedData('extras', 'showTableOfContents', checked)}
                        className="data-[state=checked]:bg-[#238636]"
                    />
                </div>

                {/* Roadmap */}
                <div className="space-y-3 pt-4 border-t border-[#30363d]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-[#3fb950]" />
                            <Label className="text-[#8b949e]">Roadmap</Label>
                        </div>
                        <Button
                            onClick={addRoadmapItem}
                            size="sm"
                            className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add Item
                        </Button>
                    </div>

                    {data.extras.roadmap.length === 0 && (
                        <div className="text-center py-4 text-[#484f58] text-sm">
                            No roadmap items. Add tasks you plan to complete.
                        </div>
                    )}

                    <div className="space-y-2">
                        {data.extras.roadmap.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-2 p-2 rounded bg-[#161b22] border border-[#30363d]"
                            >
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={(e) => updateRoadmapItem(item.id, { completed: e.target.checked })}
                                    className="rounded border-[#30363d] text-[#238636]"
                                />
                                <Input
                                    value={item.title}
                                    onChange={(e) => updateRoadmapItem(item.id, { title: e.target.value })}
                                    placeholder="Roadmap item"
                                    className="flex-1 bg-transparent border-none text-white placeholder:text-[#484f58] text-sm p-0 h-auto focus-visible:ring-0"
                                />
                                <button
                                    onClick={() => removeRoadmapItem(item.id)}
                                    className="text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="space-y-3 pt-4 border-t border-[#30363d]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#58a6ff]" />
                            <Label className="text-[#8b949e]">FAQ</Label>
                        </div>
                        <Button
                            onClick={addFaqItem}
                            size="sm"
                            className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add FAQ
                        </Button>
                    </div>

                    {data.extras.faq.length === 0 && (
                        <div className="text-center py-4 text-[#484f58] text-sm">
                            No FAQ items yet.
                        </div>
                    )}

                    <div className="space-y-3">
                        {data.extras.faq.map((item, index) => (
                            <div
                                key={item.id}
                                className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#8b949e]">FAQ #{index + 1}</span>
                                    <button
                                        onClick={() => removeFaqItem(item.id)}
                                        className="text-[#8b949e] hover:text-red-400"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <Input
                                    value={item.question}
                                    onChange={(e) => updateFaqItem(item.id, { question: e.target.value })}
                                    placeholder="Question"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm font-medium"
                                />
                                <Textarea
                                    value={item.answer}
                                    onChange={(e) => updateFaqItem(item.id, { answer: e.target.value })}
                                    placeholder="Answer"
                                    className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm resize-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Acknowledgments */}
                <div className="space-y-2 pt-4 border-t border-[#30363d]">
                    <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#f78166]" />
                        <Label className="text-[#8b949e]">Acknowledgments (markdown)</Label>
                    </div>
                    <Textarea
                        value={data.extras.acknowledgments}
                        onChange={(e) => updateNestedData('extras', 'acknowledgments', e.target.value)}
                        placeholder="Thank contributors, mention inspirations, etc..."
                        className="min-h-[80px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
