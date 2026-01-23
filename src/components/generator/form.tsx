'use client'

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { HeaderSection } from './sections/header';
import { AboutSection } from './sections/about';
import { SkillsSection } from './sections/skills';
import { SocialsSection } from './sections/socials';
import { StatsSection } from './sections/stats';
import { ProjectsSection } from './sections/projects';
import { ExtrasSection } from './sections/extras';
import { SupportSection } from './sections/support';

export const GeneratorForm = () => {
    return (
        <div
            className="flex flex-col h-full bg-[#0d1117]"
        >
            <div className="flex-1 overflow-y-auto min-h-0 p-4 custom-scrollbar">
                <Accordion type="multiple" defaultValue={['header', 'stats']} className="w-full space-y-2">
                    <HeaderSection />
                    <AboutSection />
                    <StatsSection />
                    <SkillsSection />
                    <SocialsSection />
                    <ProjectsSection />
                    <ExtrasSection />
                    <SupportSection />
                </Accordion>
            </div>
        </div>
    );
};
