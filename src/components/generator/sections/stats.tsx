'use client'

import React from 'react';
import { useReadmeStore } from '@/hooks/use-readme-store';
import { FormSection } from '../form-section';
import { LineChart, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Verified working themes for GitHub Stats API
const GITHUB_STATS_THEMES = ['tokyonight', 'radical', 'merko', 'gruvbox', 'dark', 'dracula', 'nord', 'onedark', 'cobalt', 'synthwave', 'highcontrast', 'transparent'];

// Streak Stats API Themes - Restoring all themes as requested
// Note: Some might occasionally fail due to external API stability
const STREAK_STATS_THEMES = ['tokyonight', 'radical', 'merko', 'gruvbox', 'dark', 'dracula', 'nord', 'onedark', 'cobalt', 'highcontrast'];

export const StatsSection = () => {
    const { data, updateNestedData } = useReadmeStore();
    const { stats, user } = data;
    const username = user.githubUsername || 'octocat';

    const updateStat = (statType: 'github' | 'streak' | 'topLang', key: string, value: boolean | string) => {
        updateNestedData('stats', statType, { ...stats[statType], [key]: value });
    };

    const StatCard = ({
        title,
        emoji,
        enabled,
        onToggle,
        theme,
        onThemeChange,
        themes,
    }: {
        title: string;
        emoji: string;
        enabled: boolean;
        onToggle: (v: boolean) => void;
        theme: string;
        onThemeChange: (v: string) => void;
        themes: string[];
    }) => (
        <div className={`rounded-lg border transition-all ${enabled ? 'bg-white/[0.03] border-white/[0.12]' : 'bg-white/[0.01] border-white/[0.06]'}`}>
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{emoji}</span>
                    <span className="text-sm font-medium text-white/90">{title}</span>
                </div>
                <Switch
                    checked={enabled}
                    onCheckedChange={onToggle}
                    className="data-[state=checked]:bg-green-500 scale-90"
                />
            </div>

            {enabled && (
                <div className="px-3 pb-3">
                    <div className="flex flex-wrap gap-1">
                        {themes.map((t) => (
                            <button
                                key={t}
                                onClick={() => onThemeChange(t)}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${theme === t ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' : 'bg-white/[0.03] text-white/40 hover:text-white/70 border border-transparent'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <FormSection value="stats" title="GitHub Statistics" icon={<LineChart className="w-4 h-4" />}>
            <div className="space-y-2">
                <p className="text-xs text-white/40 flex items-center gap-1.5 mb-3">
                    <Eye className="w-3 h-3" /> Username: <span className="text-blue-400 font-medium">{username}</span>
                </p>

                <StatCard
                    title="Stats Card"
                    emoji="📈"
                    enabled={stats.github.show}
                    onToggle={(v) => updateStat('github', 'show', v)}
                    theme={stats.github.theme}
                    onThemeChange={(v) => updateStat('github', 'theme', v)}
                    themes={GITHUB_STATS_THEMES}
                />

                <StatCard
                    title="Streak"
                    emoji="🔥"
                    enabled={stats.streak.show}
                    onToggle={(v) => updateStat('streak', 'show', v)}
                    theme={stats.streak.theme}
                    onThemeChange={(v) => updateStat('streak', 'theme', v)}
                    themes={STREAK_STATS_THEMES}
                />

                <StatCard
                    title="Top Languages"
                    emoji="💻"
                    enabled={stats.topLang.show}
                    onToggle={(v) => updateStat('topLang', 'show', v)}
                    theme={stats.topLang.theme}
                    onThemeChange={(v) => updateStat('topLang', 'theme', v)}
                    themes={GITHUB_STATS_THEMES}
                />
            </div>
        </FormSection>
    );
};
