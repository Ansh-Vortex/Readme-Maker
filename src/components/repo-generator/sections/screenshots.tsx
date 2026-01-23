'use client'

import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRepoReadmeStore } from '@/hooks/use-repo-readme-store';
import { Image, Plus, Trash2 } from 'lucide-react';

export const ScreenshotsSection = () => {
    const { data, updateNestedData, addScreenshot, removeScreenshot, updateScreenshot } = useRepoReadmeStore();

    return (
        <AccordionItem value="screenshots" className="border border-[#30363d] rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-[#161b22] hover:bg-[#21262d] text-white hover:no-underline">
                <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-[#a371f7]" />
                    <span>Screenshots & Demo</span>
                    <Switch
                        checked={data.screenshots.enabled}
                        onCheckedChange={(checked) => updateNestedData('screenshots', 'enabled', checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 data-[state=checked]:bg-[#238636]"
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-4 bg-[#0d1117]">
                <div className="flex items-center justify-between">
                    <Label className="text-[#8b949e]">Screenshots & Media</Label>
                    <Button
                        onClick={addScreenshot}
                        size="sm"
                        className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs"
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Screenshot
                    </Button>
                </div>

                {data.screenshots.items.length === 0 && (
                    <div className="text-center py-6 text-[#484f58] text-sm">
                        No screenshots yet. Add images, GIFs, or video links to showcase your project.
                    </div>
                )}

                <div className="space-y-3">
                    {data.screenshots.items.map((screenshot, index) => (
                        <div
                            key={screenshot.id}
                            className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#8b949e]">Screenshot #{index + 1}</span>
                                <Button
                                    onClick={() => removeScreenshot(screenshot.id)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-[#8b949e] hover:text-red-400"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <Input
                                        value={screenshot.url}
                                        onChange={(e) => updateScreenshot(screenshot.id, { url: e.target.value })}
                                        placeholder="https://example.com/screenshot.png"
                                        className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                                    />
                                </div>
                                <select
                                    value={screenshot.type}
                                    onChange={(e) => updateScreenshot(screenshot.id, { type: e.target.value as any })}
                                    className="px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white text-sm w-24"
                                >
                                    <option value="image">Image</option>
                                    <option value="gif">GIF</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>

                            <Input
                                value={screenshot.caption}
                                onChange={(e) => updateScreenshot(screenshot.id, { caption: e.target.value })}
                                placeholder="Caption (optional)"
                                className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#484f58] text-sm"
                            />

                            {/* Preview */}
                            {screenshot.url && screenshot.type === 'image' && (
                                <div className="mt-2 p-2 bg-[#0d1117] rounded border border-[#30363d]">
                                    <img
                                        src={screenshot.url}
                                        alt={screenshot.caption || 'Preview'}
                                        className="max-h-32 mx-auto rounded"
                                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-2 text-xs text-[#484f58]">
                    💡 Tip: Use services like <a href="https://imgur.com" target="_blank" className="text-[#58a6ff] hover:underline">Imgur</a> or your repo's assets for hosting images.
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
