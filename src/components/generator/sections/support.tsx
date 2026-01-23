'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSection } from '../form-section';
import { Heart, Coffee } from 'lucide-react';

export const SupportSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { support } = data;

    return (
        <FormSection value="support" title="Support" icon={<Heart className="w-4 h-4" />}>
            <div className="space-y-4">
                <p className="text-xs text-white/40">Let visitors support your work with simple badges</p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-white/[0.08] bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Coffee className="w-4 h-4 text-yellow-400" />
                            <Label className="text-white/80 text-sm font-medium">Buy Me a Coffee</Label>
                        </div>
                        <Input
                            value={support.buymeacoffee}
                            onChange={(e) => updateNestedData('support', 'buymeacoffee', e.target.value)}
                            placeholder="username"
                            className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 h-9 text-sm"
                        />
                    </div>

                    <div className="p-4 rounded-xl border border-white/[0.08] bg-gradient-to-br from-red-500/5 to-pink-500/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Heart className="w-4 h-4 text-red-400" />
                            <Label className="text-white/80 text-sm font-medium">Ko-fi</Label>
                        </div>
                        <Input
                            value={support.kofi}
                            onChange={(e) => updateNestedData('support', 'kofi', e.target.value)}
                            placeholder="username"
                            className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 h-9 text-sm"
                        />
                    </div>
                </div>

                {/* Preview */}
                {(support.buymeacoffee || support.kofi) && (
                    <div className="p-3 bg-[#0d1117] rounded-lg">
                        <p className="text-xs text-white/40 mb-2">Preview:</p>
                        <div className="flex gap-2">
                            {support.buymeacoffee && (
                                <img src={`https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black`} alt="Buy Me A Coffee" className="h-8" />
                            )}
                            {support.kofi && (
                                <img src={`https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white`} alt="Ko-fi" className="h-8" />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </FormSection>
    );
};
