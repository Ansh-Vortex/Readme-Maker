'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '../form-section';
import { User } from 'lucide-react';

export const AboutSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { about } = data;

    return (
        <FormSection value="about" title="About Me" icon={<User className="w-4 h-4" />}>
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="bio" className="text-white/80 text-sm font-medium">📝 Bio</Label>
                    <Textarea
                        id="bio"
                        value={about.bio}
                        onChange={(e) => updateNestedData('about', 'bio', e.target.value)}
                        placeholder="I'm a passionate developer who loves building things..."
                        rows={3}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 resize-none"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="workingOn" className="text-white/80 text-sm font-medium">🔭 Currently Working On</Label>
                    <Input
                        id="workingOn"
                        value={about.workingOn}
                        onChange={(e) => updateNestedData('about', 'workingOn', e.target.value)}
                        placeholder="Building an awesome SaaS product..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="learning" className="text-white/80 text-sm font-medium">🌱 Currently Learning</Label>
                    <Input
                        id="learning"
                        value={about.learning}
                        onChange={(e) => updateNestedData('about', 'learning', e.target.value)}
                        placeholder="TypeScript, Go, Kubernetes..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="askMeAbout" className="text-white/80 text-sm font-medium">💬 Ask Me About</Label>
                    <Input
                        id="askMeAbout"
                        value={about.askMeAbout}
                        onChange={(e) => updateNestedData('about', 'askMeAbout', e.target.value)}
                        placeholder="React, Node.js, System Design..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="collaboration" className="text-white/80 text-sm font-medium">👯 Looking to Collaborate On</Label>
                    <Input
                        id="collaboration"
                        value={about.collaboration}
                        onChange={(e) => updateNestedData('about', 'collaboration', e.target.value)}
                        placeholder="Open source projects, AI/ML tools..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="funFact" className="text-white/80 text-sm font-medium">⚡ Fun Fact</Label>
                    <Input
                        id="funFact"
                        value={about.funFact}
                        onChange={(e) => updateNestedData('about', 'funFact', e.target.value)}
                        placeholder="I debug code in my dreams..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="hobbies" className="text-white/80 text-sm font-medium">🎮 Hobbies & Interests</Label>
                    <Input
                        id="hobbies"
                        value={about.hobbies}
                        onChange={(e) => updateNestedData('about', 'hobbies', e.target.value)}
                        placeholder="Gaming, Music, Reading..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="contact" className="text-white/80 text-sm font-medium">📫 How to Reach Me</Label>
                    <Input
                        id="contact"
                        value={about.contact}
                        onChange={(e) => updateNestedData('about', 'contact', e.target.value)}
                        placeholder="your.email@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="portfoliolink" className="text-white/80 text-sm font-medium">🔗 Portfolio Link</Label>
                    <Input
                        id="portfoliolink"
                        value={about.portfoliolink}
                        onChange={(e) => updateNestedData('about', 'portfoliolink', e.target.value)}
                        placeholder="https://yourportfolio.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>
            </div>
        </FormSection>
    );
};
