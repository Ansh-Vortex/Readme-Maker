// Repo README Types

export interface Badge {
    id: string;
    label: string;
    message: string;
    color: string;
    style: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
    logoName?: string;
    logoColor?: string;
    customUrl?: string;
}

export interface Screenshot {
    id: string;
    url: string;
    caption: string;
    type: 'image' | 'gif' | 'video';
}

export interface CodeExample {
    id: string;
    title: string;
    language: string;
    code: string;
    output?: string;
}

export interface ApiEndpoint {
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description: string;
    parameters?: string;
    responseExample?: string;
}

export interface ConfigOption {
    id: string;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    required: boolean;
}

export interface Feature {
    id: string;
    emoji: string;
    title: string;
    description: string;
}

export interface RoadmapItem {
    id: string;
    title: string;
    completed: boolean;
}

export interface RepoReadmeData {
    projectInfo: {
        name: string;
        tagline: string;
        description: string;
        logoUrl: string;
        bannerUrl: string;
        badges: Badge[];
        websiteUrl: string;
        demoUrl: string;
    };
    installation: {
        enabled: boolean;
        packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
        packageName: string;
        prerequisites: string[];
        installCommands: string;
        additionalSteps: string;
    };
    usage: {
        enabled: boolean;
        quickStart: string;
        examples: CodeExample[];
    };
    features: {
        enabled: boolean;
        items: Feature[];
    };
    apiDocs: {
        enabled: boolean;
        description: string;
        endpoints: ApiEndpoint[];
    };
    configuration: {
        enabled: boolean;
        description: string;
        options: ConfigOption[];
        envVariables: ConfigOption[];
    };
    contributing: {
        enabled: boolean;
        guidelines: string;
        codeOfConductUrl: string;
    };
    license: {
        enabled: boolean;
        type: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'BSD-3-Clause' | 'ISC' | 'Custom';
        holder: string;
        year: string;
        customText?: string;
    };
    screenshots: {
        enabled: boolean;
        items: Screenshot[];
    };
    extras: {
        showTableOfContents: boolean;
        acknowledgments: string;
        faq: { id: string; question: string; answer: string }[];
        roadmap: RoadmapItem[];
        changelog: string;
    };
    techStack: string[];
    author: {
        name: string;
        github: string;
        twitter: string;
        website: string;
    };
}

// Preset badges for quick selection
export const PRESET_BADGES: Partial<Badge>[] = [
    { label: 'npm', logoName: 'npm', color: 'CB3837' },
    { label: 'license', logoName: '', color: '0080ff' },
    { label: 'build', message: 'passing', color: 'brightgreen' },
    { label: 'tests', message: 'passing', color: 'brightgreen' },
    { label: 'TypeScript', message: '5.0+', logoName: 'typescript', color: '3178C6' },
    { label: 'React', message: '18+', logoName: 'react', color: '61DAFB' },
    { label: 'Node.js', message: '18+', logoName: 'nodedotjs', color: '339933' },
    { label: 'PRs', message: 'welcome', color: 'brightgreen' },
    { label: 'downloads', logoName: 'npm', color: 'blue' },
    { label: 'stars', logoName: 'github', color: 'yellow' },
];

// License templates
export const LICENSE_TEMPLATES: Record<string, string> = {
    'MIT': 'MIT License',
    'Apache-2.0': 'Apache License 2.0',
    'GPL-3.0': 'GNU General Public License v3.0',
    'BSD-3-Clause': 'BSD 3-Clause License',
    'ISC': 'ISC License',
    'Custom': 'Custom License',
};
