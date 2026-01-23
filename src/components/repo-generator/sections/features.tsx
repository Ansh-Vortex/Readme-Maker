'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Sparkles, Plus, Trash2 } from 'lucide-react';

const EMOJIS = ['✨', '🚀', '💡', '⚡', '🔒', '🎨', '📦', '🔧', '🌐', '📊', '🔥', '💪', '🎯', '🛡️', '⚙️'];

export const FeaturesSection = () => {
    const { data, updateNestedData, addFeature, removeFeature, updateFeature } = useRepoReadmeStore();

    return (
        <AccordionItem value="features" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f0883e]" />
                    <span>Features</span>
                    <Switch
                        checked={data.features.enabled}
                        onCheckedChange={(checked) => updateNestedData('features', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                <div className="flex items-center justify-between">
                    <Label className="text-[#8b949e]">Feature List</Label>
                    <Button
                        onClick={addFeature}
                        size="sm"
                        className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Feature
                    </Button>
                </div>

                {data.features.items.length === 0 && (
                    <div className="text-center py-6 text-[#484f58] text-sm">
                        No features yet. Click "Add Feature" to highlight what makes your project special.
                    </div>
                )}

                <div className="space-y-3">
                    {data.features.items.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {/* Emoji picker */}
                                    <div className="relative group">
                                        <button className="w-8 h-8 rounded bg-[#21262d] border border-[#30363d] text-lg hover:border-[#8b949e] transition-colors">
                                            {feature.emoji}
                                        </button>
                                        <div className="absolute top-full left-0 mt-1 p-2 bg-[#21262d] border border-[#30363d] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 flex flex-wrap gap-1 w-[200px]">
                                            {EMOJIS.map((emoji) => (
                                                <button
                                                    key={emoji}
                                                    onClick={() => updateFeature(feature.id, { emoji })}
                                                    className="w-7 h-7 rounded hover:bg-[#30363d] text-base"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-[#8b949e]">Feature #{index + 1}</span>
                                </div>
                                <Button
                                    onClick={() => removeFeature(feature.id)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>

                            <Input
                                value={feature.title}
                                onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                                placeholder="Feature title"
                                className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm font-medium"
                            />

                            <Input
                                value={feature.description}
                                onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                                placeholder="Brief description (optional)"
                                className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                            />
                        </div>
                    ))}
                </div>

                {/* Quick add suggestions */}
                {data.features.items.length < 3 && (
                    <div className="pt-2">
                        <Label className="text-[#484f58] text-xs">Quick suggestions:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {[
                                { emoji: '⚡', title: 'Fast & Lightweight' },
                                { emoji: '🔒', title: 'Type Safe' },
                                { emoji: '📦', title: 'Zero Dependencies' },
                                { emoji: '🌐', title: 'Cross-Platform' },
                                { emoji: '🎨', title: 'Customizable' },
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        addFeature();
                                        // Need to update the last added feature
                                        setTimeout(() => {
                                            const items = useRepoReadmeStore.getState().data.features.items;
                                            if (items.length > 0) {
                                                const lastFeature = items[items.length - 1];
                                                updateFeature(lastFeature.id, suggestion);
                                            }
                                        }, 0);
                                    }}
                                    className="px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                                >
                                    {suggestion.emoji} {suggestion.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    );
};
