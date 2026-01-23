'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Settings, Plus, Trash2 } from 'lucide-react';

const DATA_TYPES = ['string', 'number', 'boolean', 'object', 'array', 'any'];

export const ConfigurationSection = () => {
    const { data, updateNestedData, addConfigOption, removeConfigOption, updateConfigOption } = useRepoReadmeStore();

    return (
        <AccordionItem value="configuration" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#8b949e]" />
                    <span>Configuration</span>
                    <Switch
                        checked={data.configuration.enabled}
                        onCheckedChange={(checked) => updateNestedData('configuration', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* Description */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">Configuration Overview</Label>
                    <Textarea
                        value={data.configuration.description}
                        onChange={(e) => updateNestedData('configuration', 'description', e.target.value)}
                        placeholder="Describe how to configure your project..."
                        className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>

                {/* Environment Variables */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-[#8b949e]">Environment Variables</Label>
                        <Button
                            onClick={() => addConfigOption('envVariables')}
                            size="sm"
                            className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add Variable
                        </Button>
                    </div>

                    {data.configuration.envVariables.length === 0 && (
                        <div className="text-center py-4 text-[#484f58] text-sm">
                            No environment variables documented.
                        </div>
                    )}

                    {data.configuration.envVariables.map((option, index) => (
                        <div
                            key={option.id}
                            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#8b949e]">Variable #{index + 1}</span>
                                <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-1 text-xs text-[#8b949e]">
                                        <input
                                            type="checkbox"
                                            checked={option.required}
                                            onChange={(e) => updateConfigOption(option.id, 'envVariables', { required: e.target.checked })}
                                            className="rounded border-[#30363d]"
                                        />
                                        Required
                                    </label>
                                    <Button
                                        onClick={() => removeConfigOption(option.id, 'envVariables')}
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 p-0 text-[#8b949e] hover:text-red-400"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={option.name}
                                    onChange={(e) => updateConfigOption(option.id, 'envVariables', { name: e.target.value })}
                                    placeholder="VARIABLE_NAME"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm font-mono"
                                />
                                <select
                                    value={option.type}
                                    onChange={(e) => updateConfigOption(option.id, 'envVariables', { type: e.target.value })}
                                    className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white text-sm"
                                >
                                    {DATA_TYPES.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={option.defaultValue}
                                    onChange={(e) => updateConfigOption(option.id, 'envVariables', { defaultValue: e.target.value })}
                                    placeholder="Default value"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                                <Input
                                    value={option.description}
                                    onChange={(e) => updateConfigOption(option.id, 'envVariables', { description: e.target.value })}
                                    placeholder="Description"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Config Options */}
                <div className="space-y-3 pt-4 border-t border-[#30363d]">
                    <div className="flex items-center justify-between">
                        <Label className="text-[#8b949e]">Configuration Options</Label>
                        <Button
                            onClick={() => addConfigOption('options')}
                            size="sm"
                            className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add Option
                        </Button>
                    </div>

                    {data.configuration.options.length === 0 && (
                        <div className="text-center py-4 text-[#484f58] text-sm">
                            No configuration options documented.
                        </div>
                    )}

                    {data.configuration.options.map((option, index) => (
                        <div
                            key={option.id}
                            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#8b949e]">Option #{index + 1}</span>
                                <Button
                                    onClick={() => removeConfigOption(option.id, 'options')}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={option.name}
                                    onChange={(e) => updateConfigOption(option.id, 'options', { name: e.target.value })}
                                    placeholder="optionName"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm font-mono"
                                />
                                <select
                                    value={option.type}
                                    onChange={(e) => updateConfigOption(option.id, 'options', { type: e.target.value })}
                                    className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white text-sm"
                                >
                                    {DATA_TYPES.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    value={option.defaultValue}
                                    onChange={(e) => updateConfigOption(option.id, 'options', { defaultValue: e.target.value })}
                                    placeholder="Default value"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                                <Input
                                    value={option.description}
                                    onChange={(e) => updateConfigOption(option.id, 'options', { description: e.target.value })}
                                    placeholder="Description"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
