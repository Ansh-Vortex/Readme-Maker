'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

interface FormSectionProps {
    value: string;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const FormSection = ({ value, title, icon, children }: FormSectionProps) => {
    return (
        <AccordionItem
            value={value}
            className="border border-[#30363d] bg-[#161b22] rounded-lg overflow-hidden"
        >
            <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-[#21262d] transition-colors">
                <div className="flex items-center gap-3 text-sm font-medium text-[#c9d1d9]">
                    <span className="text-[#8b949e]">{icon}</span>
                    {title}
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 text-[#8b949e] border-t border-[#30363d]">
                {children}
            </AccordionContent>
        </AccordionItem>
    );
};
