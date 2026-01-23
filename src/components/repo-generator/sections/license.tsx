'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Scale } from 'lucide-react';

const LICENSES = [
    { id: 'MIT', name: 'MIT License', description: 'Simple and permissive' },
    { id: 'Apache-2.0', name: 'Apache License 2.0', description: 'Patent protection' },
    { id: 'GPL-3.0', name: 'GNU GPL v3', description: 'Copyleft, share-alike' },
    { id: 'BSD-3-Clause', name: 'BSD 3-Clause', description: 'Permissive, minimal restrictions' },
    { id: 'ISC', name: 'ISC License', description: 'Simple permissive' },
    { id: 'Custom', name: 'Custom', description: 'Your own license' },
];

export const LicenseSection = () => {
    const { data, updateNestedData } = useRepoReadmeStore();

    return (
        <AccordionItem value="license" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#f0883e]" />
                    <span>License</span>
                    <Switch
                        checked={data.license.enabled}
                        onCheckedChange={(checked) => updateNestedData('license', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* License Type */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">License Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {LICENSES.map((license) => (
                            <button
                                key={license.id}
                                onClick={() => updateNestedData('license', 'type', license.id)}
                                className={`p-3 rounded-lg text-left transition-all ${data.license.type === license.id
                                        ? 'bg-[#238636]/20 border-[#238636] border'
                                        : 'bg-[#21262d] border border-[#30363d] hover:border-[#8b949e]'
                                    }`}
                            >
                                <div className="text-sm font-medium text-white">{license.name}</div>
                                <div className="text-xs text-[#8b949e]">{license.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Copyright Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[#8b949e]">Copyright Holder</Label>
                        <Input
                            value={data.license.holder}
                            onChange={(e) => updateNestedData('license', 'holder', e.target.value)}
                            placeholder="Your name or organization"
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[#8b949e]">Year</Label>
                        <Input
                            value={data.license.year}
                            onChange={(e) => updateNestedData('license', 'year', e.target.value)}
                            placeholder={new Date().getFullYear().toString()}
                            className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58]"
                        />
                    </div>
                </div>

                {/* Custom License Text */}
                {data.license.type === 'Custom' && (
                    <div className="space-y-2">
                        <Label className="text-[#8b949e]">Custom License Text</Label>
                        <Textarea
                            value={data.license.customText || ''}
                            onChange={(e) => updateNestedData('license', 'customText', e.target.value)}
                            placeholder="Enter your custom license text..."
                            className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                        />
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    );
};
