'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { FormSection } from '../form-section';
import { Puzzle, Quote, Sparkles, Activity, Trophy } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const QUOTE_THEMES = ['tokyonight', 'radical', 'gruvbox', 'dark', 'dracula', 'nord', 'algolia', 'monokai'];

export const ExtrasSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { extras } = data;
    const quoteTheme = (extras as any).quoteTheme || 'tokyonight';
    const customQuote = (extras as any).customQuote || '';

    const ExtraToggle = ({
        label,
        checked,
        onChange,
    }: {
        label: string;
        checked: boolean;
        onChange: (v: boolean) => void;
    }) => (
        <div className={`flex items-center justify-between p-3 rounded-md border transition-all ${checked ? 'bg-[#21262d] border-[#388bfd]' : 'bg-[#161b22] border-[#30363d]'}`}>
            <span className="text-sm text-[#c9d1d9]">{label}</span>
            <Switch
                checked={checked}
                onCheckedChange={onChange}
                className="data-[state=checked]:bg-[#238636] scale-90"
            />
        </div>
    );

    return (
        <FormSection value="extras" title="Extras & Widgets" icon={<Puzzle className="w-4 h-4" />}>
            <div className="space-y-2">
                <ExtraToggle
                    label="🐍 Snake Animation"
                    checked={extras.showSnake}
                    onChange={(c) => updateNestedData('extras', 'showSnake', c)}
                />

                <ExtraToggle
                    label="📈 Activity Graph"
                    checked={(extras as any).showActivity || false}
                    onChange={(c) => updateNestedData('extras', 'showActivity', c)}
                />

                <ExtraToggle
                    label="🏆 Trophies"
                    checked={(extras as any).showTrophies || false}
                    onChange={(c) => updateNestedData('extras', 'showTrophies', c)}
                />

                {/* Quote Section */}
                <div className={`rounded-md border transition-all ${extras.showQuotes ? 'bg-[#21262d] border-[#388bfd]' : 'bg-[#161b22] border-[#30363d]'}`}>
                    <div className="flex items-center justify-between p-3">
                        <span className="text-sm text-[#c9d1d9]">💭 Dev Quote</span>
                        <Switch
                            checked={extras.showQuotes}
                            onCheckedChange={(c) => updateNestedData('extras', 'showQuotes', c)}
                            className="data-[state=checked]:bg-[#238636] scale-90"
                        />
                    </div>
                    {extras.showQuotes && (
                        <div className="px-3 pb-3 space-y-2 border-t border-[#30363d]">
                            <div className="flex flex-wrap gap-1 pt-2">
                                {QUOTE_THEMES.map(theme => (
                                    <button
                                        key={theme}
                                        onClick={() => updateNestedData('extras', 'quoteTheme', theme)}
                                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${quoteTheme === theme ? 'bg-[#388bfd] text-white' : 'bg-[#21262d] text-[#8b949e] hover:text-white'}`}
                                    >
                                        {theme}
                                    </button>
                                ))}
                            </div>
                            <Input
                                value={customQuote}
                                onChange={(e) => updateNestedData('extras', 'customQuote', e.target.value)}
                                placeholder="Custom quote (optional)..."
                                className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] h-8 text-xs"
                            />
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
};
