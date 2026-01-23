'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Plug, Plus, Trash2 } from 'lucide-react';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export const ApiDocsSection = () => {
    const { data, updateNestedData, addEndpoint, removeEndpoint, updateEndpoint } = useRepoReadmeStore();

    return (
        <AccordionItem value="api-docs" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Plug className="w-4 h-4 text-[#a371f7]" />
                    <span>API Documentation</span>
                    <Switch
                        checked={data.apiDocs.enabled}
                        onCheckedChange={(checked) => updateNestedData('apiDocs', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                {/* Description */}
                <div className="space-y-2">
                    <Label className="text-[#8b949e]">API Overview</Label>
                    <Textarea
                        value={data.apiDocs.description}
                        onChange={(e) => updateNestedData('apiDocs', 'description', e.target.value)}
                        placeholder="Brief description of your API..."
                        className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] resize-none"
                    />
                </div>

                {/* Endpoints */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-[#8b949e]">Endpoints</Label>
                        <Button
                            onClick={addEndpoint}
                            size="sm"
                            className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                        >
                            <Plus className="w-3 h-3 mr-1" /> Add Endpoint
                        </Button>
                    </div>

                    {data.apiDocs.endpoints.length === 0 && (
                        <div className="text-center py-6 text-[#484f58] text-sm">
                            No endpoints documented yet. Click "Add Endpoint" to document your API.
                        </div>
                    )}

                    {data.apiDocs.endpoints.map((endpoint, index) => (
                        <div
                            key={endpoint.id}
                            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#8b949e]">Endpoint #{index + 1}</span>
                                <Button
                                    onClick={() => removeEndpoint(endpoint.id)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={endpoint.method}
                                    onChange={(e) => updateEndpoint(endpoint.id, { method: e.target.value as any })}
                                    className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white text-sm font-mono"
                                >
                                    {HTTP_METHODS.map((method) => (
                                        <option key={method} value={method}>{method}</option>
                                    ))}
                                </select>
                                <Input
                                    value={endpoint.path}
                                    onChange={(e) => updateEndpoint(endpoint.id, { path: e.target.value })}
                                    placeholder="/api/endpoint"
                                    className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm font-mono"
                                />
                            </div>

                            <Input
                                value={endpoint.description}
                                onChange={(e) => updateEndpoint(endpoint.id, { description: e.target.value })}
                                placeholder="Endpoint description"
                                className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                            />

                            <div className="space-y-1">
                                <Label className="text-[#8b949e] text-xs">Parameters (markdown)</Label>
                                <Textarea
                                    value={endpoint.parameters || ''}
                                    onChange={(e) => updateEndpoint(endpoint.id, { parameters: e.target.value })}
                                    placeholder="| Name | Type | Required | Description |"
                                    className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] font-mono text-xs resize-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-[#8b949e] text-xs">Response Example (JSON)</Label>
                                <Textarea
                                    value={endpoint.responseExample || ''}
                                    onChange={(e) => updateEndpoint(endpoint.id, { responseExample: e.target.value })}
                                    placeholder='{ "data": { ... } }'
                                    className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] font-mono text-xs resize-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
