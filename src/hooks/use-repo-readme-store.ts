import { create } from 'zustand';
import { RepoReadmeData, Badge, CodeExample, Feature, ApiEndpoint, ConfigOption, Screenshot, RoadmapItem } from '@/lib/repo-types';
import { generateRepoReadme } from '@/lib/repo-generator';

interface RepoReadmeState {
    data: RepoReadmeData;
    markdown: string;
    isGeneratingAI: boolean;
    updateData: <K extends keyof RepoReadmeData>(section: K, value: RepoReadmeData[K]) => void;
    updateNestedData: <K extends keyof RepoReadmeData>(
        section: K,
        subsection: string,
        value: any
    ) => void;
    // Badge operations
    addBadge: (badge: Badge) => void;
    removeBadge: (id: string) => void;
    updateBadge: (id: string, updates: Partial<Badge>) => void;
    // Feature operations
    addFeature: () => void;
    removeFeature: (id: string) => void;
    updateFeature: (id: string, updates: Partial<Feature>) => void;
    // Code example operations
    addCodeExample: () => void;
    removeCodeExample: (id: string) => void;
    updateCodeExample: (id: string, updates: Partial<CodeExample>) => void;
    // API endpoint operations
    addEndpoint: () => void;
    removeEndpoint: (id: string) => void;
    updateEndpoint: (id: string, updates: Partial<ApiEndpoint>) => void;
    // Config option operations
    addConfigOption: (type: 'options' | 'envVariables') => void;
    removeConfigOption: (id: string, type: 'options' | 'envVariables') => void;
    updateConfigOption: (id: string, type: 'options' | 'envVariables', updates: Partial<ConfigOption>) => void;
    // Screenshot operations
    addScreenshot: () => void;
    removeScreenshot: (id: string) => void;
    updateScreenshot: (id: string, updates: Partial<Screenshot>) => void;
    // Roadmap operations
    addRoadmapItem: () => void;
    removeRoadmapItem: (id: string) => void;
    updateRoadmapItem: (id: string, updates: Partial<RoadmapItem>) => void;
    // FAQ operations
    addFaqItem: () => void;
    removeFaqItem: (id: string) => void;
    updateFaqItem: (id: string, updates: { question?: string; answer?: string }) => void;
    // Tech stack
    addTechStack: (tech: string) => void;
    removeTechStack: (tech: string) => void;
    // Prerequisites
    addPrerequisite: (prereq: string) => void;
    removePrerequisite: (prereq: string) => void;
    // AI generation
    setGeneratingAI: (value: boolean) => void;
    applyAIContent: (section: keyof RepoReadmeData, content: any) => void;
    // Reset and regenerate
    reset: () => void;
    regenerateMarkdown: () => void;
}

const initialData: RepoReadmeData = {
    projectInfo: {
        name: '',
        tagline: '',
        description: '',
        logoUrl: '',
        bannerUrl: '',
        badges: [],
        websiteUrl: '',
        demoUrl: '',
    },
    installation: {
        enabled: true,
        packageManager: 'npm',
        packageName: '',
        prerequisites: [],
        installCommands: '',
        additionalSteps: '',
    },
    usage: {
        enabled: true,
        quickStart: '',
        examples: [],
    },
    features: {
        enabled: true,
        items: [],
    },
    apiDocs: {
        enabled: false,
        description: '',
        endpoints: [],
    },
    configuration: {
        enabled: false,
        description: '',
        options: [],
        envVariables: [],
    },
    contributing: {
        enabled: true,
        guidelines: 'Contributions are welcome! Please feel free to submit a Pull Request.',
        codeOfConductUrl: '',
    },
    license: {
        enabled: true,
        type: 'MIT',
        holder: '',
        year: new Date().getFullYear().toString(),
    },
    screenshots: {
        enabled: false,
        items: [],
    },
    extras: {
        showTableOfContents: true,
        acknowledgments: '',
        faq: [],
        roadmap: [],
        changelog: '',
    },
    techStack: [],
    author: {
        name: '',
        github: '',
        twitter: '',
        website: '',
    },
};

// Debounce utility
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_DELAY = 50;

const debouncedGenerateMarkdown = (newData: RepoReadmeData, set: any) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        set({ markdown: generateRepoReadme(newData) });
    }, DEBOUNCE_DELAY);
};

export const useRepoReadmeStore = create<RepoReadmeState>((set, get) => ({
    data: initialData,
    markdown: '',
    isGeneratingAI: false,

    updateData: (section, value) =>
        set((state) => {
            const newData = { ...state.data, [section]: value };
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
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Badge operations
    addBadge: (badge) =>
        set((state) => {
            const newData = {
                ...state.data,
                projectInfo: {
                    ...state.data.projectInfo,
                    badges: [...state.data.projectInfo.badges, badge]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeBadge: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                projectInfo: {
                    ...state.data.projectInfo,
                    badges: state.data.projectInfo.badges.filter(b => b.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateBadge: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                projectInfo: {
                    ...state.data.projectInfo,
                    badges: state.data.projectInfo.badges.map(b =>
                        b.id === id ? { ...b, ...updates } : b
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Feature operations
    addFeature: () =>
        set((state) => {
            const newFeature: Feature = {
                id: crypto.randomUUID(),
                emoji: '✨',
                title: '',
                description: ''
            };
            const newData = {
                ...state.data,
                features: {
                    ...state.data.features,
                    items: [...state.data.features.items, newFeature]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeFeature: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                features: {
                    ...state.data.features,
                    items: state.data.features.items.filter(f => f.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateFeature: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                features: {
                    ...state.data.features,
                    items: state.data.features.items.map(f =>
                        f.id === id ? { ...f, ...updates } : f
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Code example operations
    addCodeExample: () =>
        set((state) => {
            const newExample: CodeExample = {
                id: crypto.randomUUID(),
                title: 'Example',
                language: 'javascript',
                code: '',
                output: ''
            };
            const newData = {
                ...state.data,
                usage: {
                    ...state.data.usage,
                    examples: [...state.data.usage.examples, newExample]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeCodeExample: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                usage: {
                    ...state.data.usage,
                    examples: state.data.usage.examples.filter(e => e.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateCodeExample: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                usage: {
                    ...state.data.usage,
                    examples: state.data.usage.examples.map(e =>
                        e.id === id ? { ...e, ...updates } : e
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // API endpoint operations
    addEndpoint: () =>
        set((state) => {
            const newEndpoint: ApiEndpoint = {
                id: crypto.randomUUID(),
                method: 'GET',
                path: '/api/endpoint',
                description: '',
                parameters: '',
                responseExample: ''
            };
            const newData = {
                ...state.data,
                apiDocs: {
                    ...state.data.apiDocs,
                    endpoints: [...state.data.apiDocs.endpoints, newEndpoint]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeEndpoint: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                apiDocs: {
                    ...state.data.apiDocs,
                    endpoints: state.data.apiDocs.endpoints.filter(e => e.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateEndpoint: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                apiDocs: {
                    ...state.data.apiDocs,
                    endpoints: state.data.apiDocs.endpoints.map(e =>
                        e.id === id ? { ...e, ...updates } : e
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Config option operations
    addConfigOption: (type) =>
        set((state) => {
            const newOption: ConfigOption = {
                id: crypto.randomUUID(),
                name: '',
                type: 'string',
                defaultValue: '',
                description: '',
                required: false
            };
            const newData = {
                ...state.data,
                configuration: {
                    ...state.data.configuration,
                    [type]: [...state.data.configuration[type], newOption]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeConfigOption: (id, type) =>
        set((state) => {
            const newData = {
                ...state.data,
                configuration: {
                    ...state.data.configuration,
                    [type]: state.data.configuration[type].filter((o: ConfigOption) => o.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateConfigOption: (id, type, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                configuration: {
                    ...state.data.configuration,
                    [type]: state.data.configuration[type].map((o: ConfigOption) =>
                        o.id === id ? { ...o, ...updates } : o
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Screenshot operations
    addScreenshot: () =>
        set((state) => {
            const newScreenshot: Screenshot = {
                id: crypto.randomUUID(),
                url: '',
                caption: '',
                type: 'image'
            };
            const newData = {
                ...state.data,
                screenshots: {
                    ...state.data.screenshots,
                    items: [...state.data.screenshots.items, newScreenshot]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeScreenshot: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                screenshots: {
                    ...state.data.screenshots,
                    items: state.data.screenshots.items.filter(s => s.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateScreenshot: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                screenshots: {
                    ...state.data.screenshots,
                    items: state.data.screenshots.items.map(s =>
                        s.id === id ? { ...s, ...updates } : s
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Roadmap operations
    addRoadmapItem: () =>
        set((state) => {
            const newItem: RoadmapItem = {
                id: crypto.randomUUID(),
                title: '',
                completed: false
            };
            const newData = {
                ...state.data,
                extras: {
                    ...state.data.extras,
                    roadmap: [...state.data.extras.roadmap, newItem]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeRoadmapItem: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                extras: {
                    ...state.data.extras,
                    roadmap: state.data.extras.roadmap.filter(r => r.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateRoadmapItem: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                extras: {
                    ...state.data.extras,
                    roadmap: state.data.extras.roadmap.map(r =>
                        r.id === id ? { ...r, ...updates } : r
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // FAQ operations
    addFaqItem: () =>
        set((state) => {
            const newFaq = {
                id: crypto.randomUUID(),
                question: '',
                answer: ''
            };
            const newData = {
                ...state.data,
                extras: {
                    ...state.data.extras,
                    faq: [...state.data.extras.faq, newFaq]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeFaqItem: (id) =>
        set((state) => {
            const newData = {
                ...state.data,
                extras: {
                    ...state.data.extras,
                    faq: state.data.extras.faq.filter(f => f.id !== id)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    updateFaqItem: (id, updates) =>
        set((state) => {
            const newData = {
                ...state.data,
                extras: {
                    ...state.data.extras,
                    faq: state.data.extras.faq.map(f =>
                        f.id === id ? { ...f, ...updates } : f
                    )
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Tech stack
    addTechStack: (tech) =>
        set((state) => {
            if (state.data.techStack.includes(tech)) return state;
            const newData = {
                ...state.data,
                techStack: [...state.data.techStack, tech]
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removeTechStack: (tech) =>
        set((state) => {
            const newData = {
                ...state.data,
                techStack: state.data.techStack.filter(t => t !== tech)
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Prerequisites
    addPrerequisite: (prereq) =>
        set((state) => {
            if (state.data.installation.prerequisites.includes(prereq)) return state;
            const newData = {
                ...state.data,
                installation: {
                    ...state.data.installation,
                    prerequisites: [...state.data.installation.prerequisites, prereq]
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    removePrerequisite: (prereq) =>
        set((state) => {
            const newData = {
                ...state.data,
                installation: {
                    ...state.data.installation,
                    prerequisites: state.data.installation.prerequisites.filter(p => p !== prereq)
                }
            };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // AI generation
    setGeneratingAI: (value) => set({ isGeneratingAI: value }),

    applyAIContent: (section, content) =>
        set((state) => {
            const newData = { ...state.data, [section]: content };
            debouncedGenerateMarkdown(newData, set);
            return { data: newData };
        }),

    // Reset and regenerate
    reset: () => set({ data: initialData, markdown: generateRepoReadme(initialData) }),

    regenerateMarkdown: () => set((state) => ({ markdown: generateRepoReadme(state.data) })),
}));
