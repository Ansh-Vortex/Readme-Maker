'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSection } from '../form-section';
import { Share2, Github, Linkedin, Twitter, Instagram, Send, Youtube, Globe, Code2, BookOpen } from 'lucide-react';

const socialFields = [
    { key: 'github', label: 'GitHub', icon: Github, placeholder: 'username', prefix: 'github.com/' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'username', prefix: 'linkedin.com/in/' },
    { key: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: 'username', prefix: 'twitter.com/' },
    { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'username', prefix: 'instagram.com/' },
    { key: 'telegram', label: 'Telegram', icon: Send, placeholder: 'username', prefix: 't.me/' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'channel', prefix: 'youtube.com/@' },
    { key: 'dev', label: 'Dev.to', icon: Code2, placeholder: 'username', prefix: 'dev.to/' },
    { key: 'medium', label: 'Medium', icon: BookOpen, placeholder: 'username', prefix: 'medium.com/@' },
    { key: 'website', label: 'Website', icon: Globe, placeholder: 'https://yoursite.com', prefix: '' },
];

export const SocialsSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { socials } = data;

    const handleChange = (key: string, value: string) => {
        updateNestedData('socials', key, value);
    };

    return (
        <FormSection value="socials" title="Social Links" icon={<Share2 className="w-4 h-4" />}>
            <div className="space-y-3">
                <p className="text-xs text-white/40 mb-4">Just enter your username - we'll build the URLs for you!</p>

                {socialFields.map(({ key, label, icon: Icon, placeholder, prefix }) => (
                    <div key={key} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-white/50" />
                        </div>
                        <div className="flex-1 relative">
                            {prefix && (
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                                    {prefix}
                                </span>
                            )}
                            <Input
                                value={(socials as unknown as Record<string, string>)[key] || ''}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder={placeholder}
                                className={`bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30 focus:border-blue-500/50 text-sm ${prefix ? 'pl-[' + (prefix.length * 7 + 12) + 'px]' : ''}`}
                                style={prefix ? { paddingLeft: `${prefix.length * 7 + 12}px` } : {}}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </FormSection>
    );
};
