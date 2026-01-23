export interface Socials {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
    discord: string;
    dev: string;
    medium: string;
    stackoverflow: string;
    youtube: string;
    instagram: string;
    telegram: string;
}

export interface Skill {
    name: string;
    icon: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
}

export interface Stats {
    show: boolean;
    theme: string;
    showIcons: boolean;
    hideBorder: boolean;
}

export interface ReadmeData {
    header: {
        title: string;
        subtitle: string;
        banner: string;
        showViews: boolean;
    };
    about: {
        bio: string;
        workingOn: string;
        learning: string;
        askMeAbout: string;
        collaboration: string;
        funFact: string;
        contact: string;
        hobbies: string;
        portfoliolink: string;
    };
    skills: {
        languages: string[];
        frameworks: string[];
        tools: string[];
        iconStyle: string;
    };
    stats: {
        github: Stats;
        streak: Stats;
        topLang: Stats & { layout: 'compact' | 'normal' };
    };
    socials: Socials;
    projects: Project[];
    extras: {
        showSnake: boolean;
        showActivity: boolean;
        showQuotes: boolean;
    };
    support: {
        buymeacoffee: string;
        kofi: string;
    };
    user: {
        githubUsername: string;
    };
}
