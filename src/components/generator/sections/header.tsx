'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FormSection } from '../form-section';
import { User, Eye, Type } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const HeaderSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { header, user } = data;
    const { data: session } = useSession();

    // Auto-fill username from session - always sync when session is available
    useEffect(() => {
        if (session) {
            const sessionUsername = (session as any).username;
            // Always update if session username exists and is different from current
            if (sessionUsername && user.githubUsername !== sessionUsername) {
                updateNestedData('user', 'githubUsername', sessionUsername);
            }
        }
    }, [session]);

    return (
        <FormSection value="header" title="Header & Profile" icon={<User className="w-4 h-4" />}>
            <div className="space-y-4">
                <div className="grid gap-1.5">
                    <Label className="text-white/70 text-xs flex items-center gap-1.5">
                        GitHub Username <span className="text-green-400">✓</span>
                    </Label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#238636]/10 border border-[#238636]/30 rounded-md">
                        {session && (session as any).avatar && (
                            <img
                                src={(session as any).avatar}
                                alt="avatar"
                                className="w-5 h-5 rounded-full"
                            />
                        )}
                        <span className="text-[#3fb950] font-medium">
                            {user.githubUsername || 'Loading...'}
                        </span>
                    </div>
                    <p className="text-[10px] text-white/30">Auto-detected from your GitHub account</p>
                </div>

                <div className="grid gap-1.5">
                    <Label className="text-white/70 text-xs flex items-center gap-1.5">
                        <Type className="w-3 h-3" /> Title / Greeting
                    </Label>
                    <Input
                        value={header.title}
                        onChange={(e) => updateNestedData('header', 'title', e.target.value)}
                        placeholder="Hey 👋 I'm YourName"
                        className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 h-9"
                    />
                </div>

                <div className="grid gap-1.5">
                    <Label className="text-white/70 text-xs">Subtitle / Tagline</Label>
                    <Textarea
                        value={header.subtitle}
                        onChange={(e) => updateNestedData('header', 'subtitle', e.target.value)}
                        placeholder="A passionate developer building cool stuff"
                        rows={2}
                        className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 resize-none"
                    />
                </div>

                <div className="flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/[0.08] p-3">
                    <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-white/40" />
                        <div>
                            <Label className="text-white/80 text-sm">Profile Views Counter</Label>
                            <p className="text-[10px] text-white/30">Show visitor count badge</p>
                        </div>
                    </div>
                    <Switch
                        checked={header.showViews}
                        onCheckedChange={(c) => updateNestedData('header', 'showViews', c)}
                        className="data-[state=checked]:bg-green-500"
                    />
                </div>
            </div>
        </FormSection>
    );
};
