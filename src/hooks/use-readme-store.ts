import { create } from 'zustand';
import { ReadmeData, Project } from '@/lib/types';
import { generateReadme } from '@/lib/generator';

interface ReadmeState {
    data: ReadmeData;
    markdown: string;
    updateData: (section: keyof ReadmeData, value: any) => void;
    updateNestedData: (section: keyof ReadmeData, subsection: string, value: any) => void;
    addProject: () => void;
    removeProject: (id: string) => void;
    updateProject: (id: string, field: keyof Project, value: string) => void;
    reset: () => void;
    regenerateMarkdown: () => void;
}

const initialData: ReadmeData = {
    user: { githubUsername: '' },
    header: {
        title: '',
        subtitle: '',
        banner: '',
        showViews: true
    },
    about: {
        bio: "I'm a Full Stack Developer...",
        workingOn: '',
        learning: '',
        askMeAbout: '',
        collaboration: '',
        funFact: '',
        contact: '',
        hobbies: '',
        portfoliolink: ''
    },
    skills: {
        languages: [],
        frameworks: [],
        tools: [],
        iconStyle: 'skillicons'
    },
    stats: {
        github: { show: true, theme: 'tokyonight', showIcons: true, hideBorder: true },
        streak: { show: true, theme: 'tokyonight', showIcons: true, hideBorder: true },
        topLang: { show: true, theme: 'tokyonight', showIcons: true, hideBorder: true, layout: 'compact' },
    },
    socials: {
        github: '',
        twitter: '',
        linkedin: '',
        website: '',
        discord: '',
        dev: '',
        medium: '',
        stackoverflow: '',
        youtube: '',
        instagram: '',
        telegram: ''
    },
    projects: [],
    extras: {
        showSnake: false,
        showActivity: false,
        showQuotes: true,
    },
    support: {
        buymeacoffee: '',
        kofi: ''
    },
};

// Debounce utility for fast updates
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_DELAY = 50; // 50ms debounce for instant feel

const debouncedGenerateMarkdown = (newData: ReadmeData, set: any) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        set({ markdown: generateReadme(newData) });
    }, DEBOUNCE_DELAY);
};

export const useReadmeStore = create<ReadmeState>((set, get) => ({
    data: initialData,
    markdown: generateReadme(initialData),

    updateData: (section, value) =>
        set((state) => {
            const newData = { ...state.data, [section]: value };
            // Immediate data update, debounced markdown
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateNestedData: (section, subsection, value) =>
        set((state) => {
            const sectionData = state.data[section] as any;
            const newData = {
                ...state.data,
                [section]: { ...sectionData, [subsection]: value }
            };
            // Immediate data update, debounced markdown
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    addProject: () =>
        set((state) => {
            const newProject = { id: crypto.randomUUID(), name: '', description: '', link: '' };
            const newData = { ...state.data, projects: [...state.data.projects, newProject] };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeProject: (id) =>
        set((state) => {
            const newData = { ...state.data, projects: state.data.projects.filter(p => p.id !== id) };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateProject: (id, field, value) =>
        set((state) => {
            const newData = {
                ...state.data,
                projects: state.data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    reset: () => set({ data: initialData, markdown: generateReadme(initialData) }),

    regenerateMarkdown: () => set((state) => ({ markdown: generateReadme(state.data) })),
}));
