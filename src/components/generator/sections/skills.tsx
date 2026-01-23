'use client'

import React, { useState } from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { FormSection } from '../form-section';
import { Wrench, Search, Check } from 'lucide-react';
import { SKILLS } from '@/lib/constants';
import { Input } from '@/components/ui/input';

// Icon style options
const ICON_STYLES = [
    { id: 'skillicons', name: 'Skill Icons Dark' },
    { id: 'skillicons-light', name: 'Skill Icons Light' },
    { id: 'shields-badge', name: 'Shield Badges' },
    { id: 'shields-flat', name: 'Shield Flat' },
    { id: 'shields-plastic', name: 'Shield Plastic' },
    { id: 'skillicons-animated', name: 'Skill Icons Animated' },
    { id: 'simple-colored', name: 'Simple Colored' },
    { id: 'simple-white', name: 'Simple White' },
    { id: 'logos', name: 'SVG Logos' },
    { id: 'minimal', name: 'Minimal Icons' },
];

export const SkillsSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { skills } = data;
    const [search, setSearch] = useState('');

    const toggleSkill = (category: 'languages' | 'frameworks' | 'tools', skill: string) => {
        const current = skills[category];
        const updated = current.includes(skill)
            ? current.filter(s => s !== skill)
            : [...current, skill];
        updateNestedData('skills', category, updated);
    };

    const filterSkills = (items: { name: string; icon: string }[]) => {
        if (!search) return items;
        return items.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    };

    // Simple skill badge without external images
    const SkillBadge = ({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) => (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border
                ${selected
                    ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                    : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white/80'
                }
            `}
        >
            {selected && <Check className="w-3 h-3" />}
            {name}
        </button>
    );

    const CategorySection = ({
        title,
        items,
        category,
        color
    }: {
        title: string;
        items: { name: string; icon: string }[];
        category: 'languages' | 'frameworks' | 'tools';
        color: string;
    }) => {
        const filtered = filterSkills(items);
        const selected = skills[category];

        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${color}`} />
                        {title}
                        {selected.length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                                {selected.length}
                            </span>
                        )}
                    </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                    {filtered.map((s) => (
                        <SkillBadge
                            key={s.name}
                            name={s.name}
                            selected={selected.includes(s.name)}
                            onClick={() => toggleSkill(category, s.name)}
                        />
                    ))}
                    {filtered.length === 0 && (
                        <p className="text-white/40 text-xs">No matches</p>
                    )}
                </div>
            </div>
        );
    };

    const iconStyle = (skills as any).iconStyle || 'skillicons';

    return (
        <FormSection value="skills" title="Skills & Technologies" icon={<Wrench className="w-4 h-4" />}>
            <div className="space-y-4">
                {/* Icon Style Selector */}
                <div className="space-y-2">
                    <h4 className="text-xs font-medium text-white/60">Icon Style for README</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {ICON_STYLES.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => updateNestedData('skills', 'iconStyle', style.id)}
                                className={`
                                    px-2.5 py-1 rounded text-[10px] font-medium transition-all border
                                    ${iconStyle === style.id
                                        ? 'bg-green-500/20 border-green-400/50 text-green-300'
                                        : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white/80'
                                    }
                                `}
                            >
                                {iconStyle === style.id && '✓ '}
                                {style.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <Input
                        placeholder="Search skills..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-8 text-sm bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/30"
                    />
                </div>

                <CategorySection
                    title="Languages"
                    items={SKILLS.languages}
                    category="languages"
                    color="bg-blue-400"
                />

                <CategorySection
                    title="Frameworks & Libraries"
                    items={SKILLS.frameworks}
                    category="frameworks"
                    color="bg-purple-400"
                />

                <CategorySection
                    title="Tools & Platforms"
                    items={SKILLS.tools}
                    category="tools"
                    color="bg-green-400"
                />
            </div>
        </FormSection>
    );
};
