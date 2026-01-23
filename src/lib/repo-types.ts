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
    _preview?: string; // Local preview URL (not saved)
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

export const TECH_COLORS: Record<string, string> = {
    'TypeScript': '3178C6',
    'JavaScript': 'F7DF1E',
    'Python': '3776AB',
    'Java': 'ED8B00',
    'Go': '00ADD8',
    'Rust': '000000',
    'C++': '00599C',
    'C': '555555',
    'C#': '239120',
    'PHP': '777BB4',
    'Ruby': 'CC342D',
    'Swift': 'F05138',
    'Kotlin': '7F52FF',
    'Dart': '0175C2',
    'Lua': '2C2D72',
    'Shell': '89E051',
    'HTML': 'E34F26',
    'CSS': '563D7C',
    'Vue': '4FC08D',
    'React': '61DAFB',
    'Angular': 'DD0031',
    'Svelte': 'FF3E00',
    'Next.js': '000000',
    'Node.js': '339933',
    'Docker': '2496ED',
    'Kubernetes': '326CE5',
    'AWS': '232F3E',
    'Git': 'F05032',
    'Linux': 'FCC624',
    'Express': '000000',
    'MongoDB': '47A248',
    'PostgreSQL': '4169E1',
    'MySQL': '4479A1',
    'Redis': 'DC382D',
    'Tailwind': '06B6D4',
    'Sass': 'CC6699',
    'Prisma': '2D3748',
    'GraphQL': 'E10098',
    'Firebase': 'FFCA28',
    'Supabase': '3ECF8E',
    'Vite': '646CFF',
    'Webpack': '8DD6F9',
};
