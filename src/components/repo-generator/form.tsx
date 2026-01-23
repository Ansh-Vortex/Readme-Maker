'use client'

import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { ProjectInfoSection } from './sections/project-info';
import { InstallationSection } from './sections/installation';
import { UsageSection } from './sections/usage';
import { FeaturesSection } from './sections/features';
import { ApiDocsSection } from './sections/api-docs';
import { ConfigurationSection } from './sections/configuration';
import { ContributingSection } from './sections/contributing';
import { LicenseSection } from './sections/license';
import { ScreenshotsSection } from './sections/screenshots';
import { ExtrasSection } from './sections/extras';

export const RepoGeneratorForm = () => {
    return (
        <div className="flex flex-col h-full bg-[#0d1117]">
            <div className="flex-1 overflow-y-auto min-h-0 p-4 custom-scrollbar">
                <Accordion type="multiple" defaultValue={['project-info', 'features']} className="w-full space-y-2">
                    <ProjectInfoSection />
                    <FeaturesSection />
                    <ScreenshotsSection />
                    <InstallationSection />
                    <UsageSection />
                    <ApiDocsSection />
                    <ConfigurationSection />
                    <ContributingSection />
                    <LicenseSection />
                    <ExtrasSection />
                </Accordion>
            </div>
        </div>
    );
};
