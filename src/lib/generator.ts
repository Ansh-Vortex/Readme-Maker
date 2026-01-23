import { ReadmeData } from './types';

// Skill icons - Comprehensive list with working shields.io logos
const skillIcons: Record<string, { logo: string; color: string }> = {
    // Languages
    'JavaScript': { logo: 'javascript', color: 'F7DF1E' },
    'TypeScript': { logo: 'typescript', color: '3178C6' },
    'Python': { logo: 'python', color: '3776AB' },
    'Java': { logo: 'openjdk', color: 'ED8B00' },
    'C': { logo: 'c', color: 'A8B9CC' },
    'C++': { logo: 'cplusplus', color: '00599C' },
    'C#': { logo: 'csharp', color: '239120' },
    'Go': { logo: 'go', color: '00ADD8' },
    'Rust': { logo: 'rust', color: '000000' },
    'Ruby': { logo: 'ruby', color: 'CC342D' },
    'PHP': { logo: 'php', color: '777BB4' },
    'Swift': { logo: 'swift', color: 'FA7343' },
    'Kotlin': { logo: 'kotlin', color: '7F52FF' },
    'Dart': { logo: 'dart', color: '0175C2' },
    'Scala': { logo: 'scala', color: 'DC322F' },
    'R': { logo: 'r', color: '276DC3' },
    'Lua': { logo: 'lua', color: '2C2D72' },
    'Perl': { logo: 'perl', color: '39457E' },
    'Haskell': { logo: 'haskell', color: '5D4F85' },
    'Elixir': { logo: 'elixir', color: '4B275F' },
    'Clojure': { logo: 'clojure', color: '5881D8' },
    'Julia': { logo: 'julia', color: '9558B2' },
    'Objective-C': { logo: 'apple', color: '000000' },
    'Assembly': { logo: 'assembly', color: '6E4C13' },
    'Solidity': { logo: 'solidity', color: '363636' },
    'MATLAB': { logo: 'mathworks', color: '0076A8' },
    'Bash': { logo: 'gnubash', color: '4EAA25' },
    'PowerShell': { logo: 'powershell', color: '5391FE' },

    // Frameworks & Libraries
    'React': { logo: 'react', color: '61DAFB' },
    'Next.js': { logo: 'nextdotjs', color: '000000' },
    'Vue.js': { logo: 'vuedotjs', color: '4FC08D' },
    'Nuxt.js': { logo: 'nuxtdotjs', color: '00DC82' },
    'Angular': { logo: 'angular', color: 'DD0031' },
    'Svelte': { logo: 'svelte', color: 'FF3E00' },
    'Node.js': { logo: 'nodedotjs', color: '339933' },
    'Express': { logo: 'express', color: '000000' },
    'NestJS': { logo: 'nestjs', color: 'E0234E' },
    'Django': { logo: 'django', color: '092E20' },
    'Flask': { logo: 'flask', color: '000000' },
    'FastAPI': { logo: 'fastapi', color: '009688' },
    'Spring': { logo: 'spring', color: '6DB33F' },
    'Rails': { logo: 'rubyonrails', color: 'CC0000' },
    'Laravel': { logo: 'laravel', color: 'FF2D20' },
    'ASP.NET': { logo: 'dotnet', color: '512BD4' },
    'Flutter': { logo: 'flutter', color: '02569B' },
    'React Native': { logo: 'react', color: '61DAFB' },
    'Electron': { logo: 'electron', color: '47848F' },
    'Tauri': { logo: 'tauri', color: 'FFC131' },
    'Qt': { logo: 'qt', color: '41CD52' },
    'Remix': { logo: 'remix', color: '000000' },
    'Astro': { logo: 'astro', color: 'FF5D01' },
    'Gatsby': { logo: 'gatsby', color: '663399' },
    'Hugo': { logo: 'hugo', color: 'FF4088' },
    'Tailwind CSS': { logo: 'tailwindcss', color: '06B6D4' },
    'Bootstrap': { logo: 'bootstrap', color: '7952B3' },
    'Material UI': { logo: 'mui', color: '007FFF' },
    'Chakra UI': { logo: 'chakraui', color: '319795' },
    'Styled Components': { logo: 'styledcomponents', color: 'DB7093' },
    'Sass': { logo: 'sass', color: 'CC6699' },
    'Redux': { logo: 'redux', color: '764ABC' },
    'GraphQL': { logo: 'graphql', color: 'E10098' },
    'Apollo': { logo: 'apollographql', color: '311C87' },
    'tRPC': { logo: 'trpc', color: '2596BE' },
    'Prisma': { logo: 'prisma', color: '2D3748' },
    'Drizzle': { logo: 'drizzle', color: 'C5F74F' },
    'Socket.io': { logo: 'socketdotio', color: '010101' },
    'Three.js': { logo: 'threedotjs', color: '000000' },
    'TensorFlow': { logo: 'tensorflow', color: 'FF6F00' },
    'PyTorch': { logo: 'pytorch', color: 'EE4C2C' },
    'Keras': { logo: 'keras', color: 'D00000' },
    'OpenCV': { logo: 'opencv', color: '5C3EE8' },
    'Pandas': { logo: 'pandas', color: '150458' },
    'NumPy': { logo: 'numpy', color: '013243' },
    'Scikit-learn': { logo: 'scikitlearn', color: 'F7931E' },

    // Tools & Platforms
    'Git': { logo: 'git', color: 'F05032' },
    'GitHub': { logo: 'github', color: '181717' },
    'GitLab': { logo: 'gitlab', color: 'FC6D26' },
    'Bitbucket': { logo: 'bitbucket', color: '0052CC' },
    'Docker': { logo: 'docker', color: '2496ED' },
    'Kubernetes': { logo: 'kubernetes', color: '326CE5' },
    'AWS': { logo: 'amazonaws', color: '232F3E' },
    'Azure': { logo: 'microsoftazure', color: '0078D4' },
    'Google Cloud': { logo: 'googlecloud', color: '4285F4' },
    'Vercel': { logo: 'vercel', color: '000000' },
    'Netlify': { logo: 'netlify', color: '00C7B7' },
    'Heroku': { logo: 'heroku', color: '430098' },
    'DigitalOcean': { logo: 'digitalocean', color: '0080FF' },
    'Cloudflare': { logo: 'cloudflare', color: 'F38020' },
    'Firebase': { logo: 'firebase', color: 'FFCA28' },
    'Supabase': { logo: 'supabase', color: '3ECF8E' },
    'MongoDB': { logo: 'mongodb', color: '47A248' },
    'PostgreSQL': { logo: 'postgresql', color: '4169E1' },
    'MySQL': { logo: 'mysql', color: '4479A1' },
    'Redis': { logo: 'redis', color: 'DC382D' },
    'SQLite': { logo: 'sqlite', color: '003B57' },
    'Elasticsearch': { logo: 'elasticsearch', color: '005571' },
    'Nginx': { logo: 'nginx', color: '009639' },
    'Apache': { logo: 'apache', color: 'D22128' },
    'Linux': { logo: 'linux', color: 'FCC624' },
    'Ubuntu': { logo: 'ubuntu', color: 'E95420' },
    'Debian': { logo: 'debian', color: 'A81D33' },
    'macOS': { logo: 'apple', color: '000000' },
    'Windows': { logo: 'windows11', color: '0078D4' },
    'VS Code': { logo: 'visualstudiocode', color: '007ACC' },
    'IntelliJ': { logo: 'intellijidea', color: '000000' },
    'Vim': { logo: 'vim', color: '019733' },
    'Neovim': { logo: 'neovim', color: '57A143' },
    'Figma': { logo: 'figma', color: 'F24E1E' },
    'Adobe XD': { logo: 'adobexd', color: 'FF61F6' },
    'Photoshop': { logo: 'adobephotoshop', color: '31A8FF' },
    'Illustrator': { logo: 'adobeillustrator', color: 'FF9A00' },
    'Blender': { logo: 'blender', color: 'E87D0D' },
    'Unity': { logo: 'unity', color: '000000' },
    'Unreal Engine': { logo: 'unrealengine', color: '0E1128' },
    'Postman': { logo: 'postman', color: 'FF6C37' },
    'Insomnia': { logo: 'insomnia', color: '4000BF' },
    'Jest': { logo: 'jest', color: 'C21325' },
    'Cypress': { logo: 'cypress', color: '17202C' },
    'Playwright': { logo: 'playwright', color: '2EAD33' },
    'Selenium': { logo: 'selenium', color: '43B02A' },
    'Jenkins': { logo: 'jenkins', color: 'D24939' },
    'CircleCI': { logo: 'circleci', color: '343434' },
    'GitHub Actions': { logo: 'githubactions', color: '2088FF' },
    'Terraform': { logo: 'terraform', color: '7B42BC' },
    'Ansible': { logo: 'ansible', color: 'EE0000' },
    'Grafana': { logo: 'grafana', color: 'F46800' },
    'Prometheus': { logo: 'prometheus', color: 'E6522C' },
    'Datadog': { logo: 'datadog', color: '632CA6' },
    'Sentry': { logo: 'sentry', color: '362D59' },
    'Jira': { logo: 'jira', color: '0052CC' },
    'Notion': { logo: 'notion', color: '000000' },
    'Slack': { logo: 'slack', color: '4A154B' },
    'Discord': { logo: 'discord', color: '5865F2' },
    'Webpack': { logo: 'webpack', color: '8DD6F9' },
    'Vite': { logo: 'vite', color: '646CFF' },
    'Babel': { logo: 'babel', color: 'F9DC3E' },
    'ESLint': { logo: 'eslint', color: '4B32C3' },
    'Prettier': { logo: 'prettier', color: 'F7B93E' },
    'npm': { logo: 'npm', color: 'CB3837' },
    'Yarn': { logo: 'yarn', color: '2C8EBB' },
    'pnpm': { logo: 'pnpm', color: 'F69220' },
    'Bun': { logo: 'bun', color: 'FBF0DF' }
};

// Skill icons mapping to skillicons.dev slugs
const skillIconsSlugs: Record<string, string> = {
    // Languages
    'JavaScript': 'js', 'TypeScript': 'ts', 'Python': 'py', 'Java': 'java',
    'C': 'c', 'C++': 'cpp', 'C#': 'cs', 'Go': 'go', 'Rust': 'rust',
    'Ruby': 'ruby', 'PHP': 'php', 'Swift': 'swift', 'Kotlin': 'kotlin',
    'Dart': 'dart', 'Scala': 'scala', 'R': 'r', 'Lua': 'lua', 'Perl': 'perl',
    'Haskell': 'haskell', 'Elixir': 'elixir', 'Clojure': 'clojure',
    'Julia': 'julia', 'Objective-C': 'objectivec', 'Assembly': 'assembly',
    'Solidity': 'solidity', 'MATLAB': 'matlab', 'Bash': 'bash', 'PowerShell': 'powershell',

    // Frameworks
    'React': 'react', 'Next.js': 'nextjs', 'Vue.js': 'vue', 'Nuxt.js': 'nuxtjs',
    'Angular': 'angular', 'Svelte': 'svelte', 'Node.js': 'nodejs',
    'Express': 'express', 'NestJS': 'nestjs', 'Django': 'django',
    'Flask': 'flask', 'FastAPI': 'fastapi', 'Spring': 'spring',
    'Rails': 'rails', 'Laravel': 'laravel', 'ASP.NET': 'dotnet',
    'Flutter': 'flutter', 'React Native': 'react', 'Electron': 'electron',
    'Tauri': 'tauri', 'Qt': 'qt', 'Remix': 'remix', 'Astro': 'astro',
    'Gatsby': 'gatsby', 'Hugo': 'hugo', 'Tailwind CSS': 'tailwind',
    'Bootstrap': 'bootstrap', 'Material UI': 'materialui', 'Chakra UI': 'chakra',
    'Styled Components': 'styledcomponents', 'Sass': 'sass', 'Redux': 'redux',
    'GraphQL': 'graphql', 'Apollo': 'apollo', 'tRPC': 'trpc', 'Prisma': 'prisma',
    'Drizzle': 'drizzle', 'Socket.io': 'socketdotio', 'Three.js': 'threejs',
    'TensorFlow': 'tensorflow', 'PyTorch': 'pytorch', 'Keras': 'keras',
    'OpenCV': 'opencv', 'Pandas': 'pandas', 'NumPy': 'numpy',
    'Scikit-learn': 'scikitlearn',

    // Tools
    'Git': 'git', 'GitHub': 'github', 'GitLab': 'gitlab', 'Bitbucket': 'bitbucket',
    'Docker': 'docker', 'Kubernetes': 'kubernetes', 'AWS': 'aws',
    'Azure': 'azure', 'Google Cloud': 'gcp', 'Vercel': 'vercel',
    'Netlify': 'netlify', 'Heroku': 'heroku', 'DigitalOcean': 'digitalocean',
    'Cloudflare': 'cloudflare', 'Firebase': 'firebase', 'Supabase': 'supabase',
    'MongoDB': 'mongodb', 'PostgreSQL': 'postgres', 'MySQL': 'mysql',
    'Redis': 'redis', 'SQLite': 'sqlite', 'Elasticsearch': 'elasticsearch',
    'Nginx': 'nginx', 'Apache': 'apache', 'Linux': 'linux', 'Ubuntu': 'ubuntu',
    'Debian': 'debian', 'macOS': 'apple', 'Windows': 'windows',
    'VS Code': 'vscode', 'IntelliJ': 'idea', 'Vim': 'vim', 'Neovim': 'neovim',
    'Figma': 'figma', 'Adobe XD': 'xd', 'Photoshop': 'ps', 'Illustrator': 'ai',
    'Blender': 'blender', 'Unity': 'unity', 'Unreal Engine': 'unreal',
    'Postman': 'postman', 'Insomnia': 'insomnia', 'Jest': 'jest',
    'Cypress': 'cypress', 'Playwright': 'playwright', 'Selenium': 'selenium',
    'Jenkins': 'jenkins', 'CircleCI': 'circleci', 'GitHub Actions': 'githubactions',
    'Terraform': 'terraform', 'Ansible': 'ansible', 'Grafana': 'grafana',
    'Prometheus': 'prometheus', 'Datadog': 'datadog', 'Sentry': 'sentry',
    'Jira': 'jira', 'Notion': 'notion', 'Slack': 'slack', 'Discord': 'discord',
    'Webpack': 'webpack', 'Vite': 'vite', 'Babel': 'babel', 'ESLint': 'eslint',
    'Prettier': 'prettier', 'npm': 'npm', 'Yarn': 'yarn', 'pnpm': 'pnpm',
    'Bun': 'bun'
};

// Generate skill icons using skillicons.dev (visual icons)
function generateSkillIconsStyle(skills: string[], iconStyle: string): string {
    const slugs = skills
        .map(s => skillIconsSlugs[s])
        .filter(Boolean);

    if (slugs.length === 0) return '';

    // All styles use skillicons.dev as it's the most reliable
    const generateSkillIconsRows = (theme: string, perLine: number = 12): string => {
        const rows: string[] = [];
        for (let i = 0; i < slugs.length; i += perLine) {
            const chunk = slugs.slice(i, i + perLine);
            rows.push(`<img src="https://skillicons.dev/icons?i=${chunk.join(',')}&theme=${theme}" alt="skills" />`);
        }
        return rows.join('<br />');
    };

    // Generate shields.io badges as HTML img tags
    const generateShieldBadges = (style: string): string => {
        return skills.map(s => {
            const icon = skillIcons[s];
            if (icon) {
                const encodedName = encodeURIComponent(s).replace(/-/g, '--').replace(/_/g, '__');
                return `<img src="https://img.shields.io/badge/${encodedName}-${icon.color}?style=${style}&logo=${icon.logo}&logoColor=white" alt="${s}" />`;
            }
            return `<img src="https://img.shields.io/badge/${encodeURIComponent(s)}-333333?style=${style}" alt="${s}" />`;
        }).join(' ');
    };

    switch (iconStyle) {
        case 'skillicons':
            return generateSkillIconsRows('dark');
        case 'skillicons-light':
            return generateSkillIconsRows('light');
        case 'shields-badge':
            return generateShieldBadges('for-the-badge');
        case 'shields-flat':
            return generateShieldBadges('flat');
        case 'shields-plastic':
            return generateShieldBadges('plastic');
        case 'skillicons-animated':
            const animatedRows: string[] = [];
            for (let i = 0; i < slugs.length; i += 8) {
                const chunk = slugs.slice(i, i + 8);
                animatedRows.push(`<img src="https://skillicons.dev/icons?i=${chunk.join(',')}&theme=dark&perline=8" alt="skills" />`);
            }
            return animatedRows.join('<br />');
        case 'simple-colored':
            return generateSkillIconsRows('dark', 10);
        case 'simple-white':
            return generateSkillIconsRows('light', 10);
        case 'logos':
            return generateSkillIconsRows('dark', 15);
        case 'minimal':
            return generateSkillIconsRows('light', 6);
        default:
            return generateSkillIconsRows('dark');
    }
}

// Helper functions for removed styles (kept empty/minimized or removed if possible, but keeping function signatures if cleaning up completely needs more refactor)
function generateShieldsBadges(skills: string[], style: string): string {
    return ''; // Removed functionality
}

function generateSkillBadges(skills: string[]): string {
    return ''; // Removed functionality
}


export const generateReadme = (data: ReadmeData): string => {
    const { header, about, skills, stats, socials, projects, extras, support, user } = data;
    const username = user.githubUsername || 'octocat';
    const quoteTheme = (extras as any).quoteTheme || 'tokyonight';
    const customQuote = (extras as any).customQuote || '';

    let md = '';

    // Typing SVG Header
    const titleText = header.title || `Hey 👋 I'm ${username}`;
    md += `<div align="center">

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=58A6FF&center=true&vCenter=true&width=600&lines=${encodeURIComponent(titleText)}" alt="Typing SVG" /></a>

`;

    if (header.subtitle) {
        md += `### ${header.subtitle}\n\n`;
    }

    // Profile badges
    if (header.showViews) {
        md += `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=blueviolet&style=flat-square) ![Followers](https://img.shields.io/github/followers/${username}?style=flat-square&color=blue)\n\n`;
    }

    // Social Links
    const socialLinks: string[] = [];
    if (socials.github) socialLinks.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${socials.github})`);
    if (socials.linkedin) socialLinks.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${socials.linkedin})`);
    if (socials.twitter) socialLinks.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${socials.twitter})`);
    if (socials.instagram) socialLinks.push(`[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/${socials.instagram})`);
    if (socials.telegram) socialLinks.push(`[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/${socials.telegram})`);
    if (socials.youtube) socialLinks.push(`[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@${socials.youtube})`);
    if (socials.website) socialLinks.push(`[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](${socials.website})`);

    if (socialLinks.length > 0) {
        md += socialLinks.join(' ') + '\n\n';
    }

    md += '</div>\n\n---\n\n';

    // About Section
    const hasAboutContent = about.bio || about.workingOn || about.learning || about.askMeAbout ||
        about.collaboration || about.funFact || about.hobbies ||
        about.contact || about.portfoliolink;

    if (hasAboutContent) {
        md += '## 🧐 About Me\n\n';
        if (about.bio) md += `${about.bio}\n\n`;
        if (about.workingOn) md += `- 🔭 I'm currently working on **${about.workingOn}**\n`;
        if (about.learning) md += `- 🌱 I'm currently learning **${about.learning}**\n`;
        if (about.askMeAbout) md += `- 💬 Ask me about **${about.askMeAbout}**\n`;
        if (about.collaboration) md += `- 👯 I'm looking to collaborate on **${about.collaboration}**\n`;
        if (about.funFact) md += `- ⚡ Fun fact: **${about.funFact}**\n`;
        if (about.hobbies) md += `- 🎮 Hobbies: **${about.hobbies}**\n`;
        if (about.contact) md += `- 📫 How to reach me: **${about.contact}**\n`;
        if (about.portfoliolink) md += `- 🔗 Portfolio: **[${about.portfoliolink}](${about.portfoliolink})**\n`;
        md += '\n';
    }

    // Tech Stack with separated sections
    const iconStyle = (skills as any).iconStyle || 'skillicons';

    if (skills.languages.length || skills.frameworks.length || skills.tools.length) {
        md += '## 🛠️ Tech Stack\n\n';

        if (skills.languages.length > 0) {
            md += '### 👨‍💻 Languages\n\n';
            const langIcons = generateSkillIconsStyle(skills.languages, iconStyle);
            if (langIcons) md += `<p align="left">\n${langIcons}\n</p>\n\n`;
        }

        if (skills.frameworks.length > 0) {
            md += '### ⚛️ Frameworks & Libraries\n\n';
            const frameworkIcons = generateSkillIconsStyle(skills.frameworks, iconStyle);
            if (frameworkIcons) md += `<p align="left">\n${frameworkIcons}\n</p>\n\n`;
        }

        if (skills.tools.length > 0) {
            md += '### 🛠 Tools & Platforms\n\n';
            const toolIcons = generateSkillIconsStyle(skills.tools, iconStyle);
            if (toolIcons) md += `<p align="left">\n${toolIcons}\n</p>\n\n`;
        }
    }

    // GitHub Stats - Perfect layout with all cards
    if (stats.github.show || stats.topLang.show || stats.streak.show) {
        md += '## 📊 GitHub Stats\n\n';

        // Count how many stats are enabled
        const enabledStats = [stats.github.show, stats.streak.show, stats.topLang.show].filter(Boolean).length;

        if (enabledStats >= 2) {
            // Use table layout for multiple stats
            md += '<div align="center">\n';
            md += '  <table>\n';
            md += '    <tr>\n';

            if (stats.github.show) {
                md += `      <td><img width="100%" src="https://github-readme-stats-sigma-five.vercel.app/api?username=${username.trim()}&show_icons=true&theme=${stats.github.theme}&hide_border=true" alt="GitHub Stats" loading="eager" fetchpriority="high" /></td>\n`;
            }
            if (stats.streak.show) {
                md += `      <td><img width="100%" src="https://github-readme-streak-stats-salesp07.vercel.app/?user=${username.trim()}&theme=${stats.streak.theme}&hide_border=true" alt="GitHub Streak" loading="eager" fetchpriority="high" /></td>\n`;
            }
            md += '    </tr>\n';

            if (stats.topLang.show) {
                md += '    <tr>\n';
                md += `      <td colspan="${stats.github.show && stats.streak.show ? 2 : 1}" align="center"><img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${username.trim()}&layout=${stats.topLang.layout}&theme=${stats.topLang.theme}&hide_border=true&langs_count=8" alt="Top Languages" /></td>\n`;
                md += '    </tr>\n';
            }

            md += '  </table>\n';
            md += '</div>\n\n';
        } else {
            // Single stat - center it
            if (stats.github.show) {
                md += `<div align="center">\n  <img src="https://github-readme-stats-sigma-five.vercel.app/api?username=${username.trim()}&show_icons=true&theme=${stats.github.theme}&hide_border=true" alt="GitHub Stats" loading="eager" fetchpriority="high" />\n</div>\n\n`;
            }
            if (stats.streak.show) {
                md += `<div align="center">\n  <img src="https://github-readme-streak-stats-salesp07.vercel.app/?user=${username.trim()}&theme=${stats.streak.theme}&hide_border=true" alt="GitHub Streak" loading="eager" fetchpriority="high" />\n</div>\n\n`;
            }
            if (stats.topLang.show) {
                md += `<div align="center">\n  <img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${username.trim()}&layout=${stats.topLang.layout}&theme=${stats.topLang.theme}&hide_border=true&langs_count=8" alt="Top Languages" loading="eager" fetchpriority="high" />\n</div>\n\n`;
            }
        }
    }

    // Trophies
    if ((extras as any).showTrophies) {
        md += '## 🏆 GitHub Trophies\n\n';
        md += `<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=tokyonight&no-frame=true&no-bg=true&row=1&column=7" />
</p>\n\n`;
    }

    // Activity Graph
    if ((extras as any).showActivity) {
        md += '## 📈 Activity Graph\n\n';
        md += `<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=tokyo-night&hide_border=true" />
</p>\n\n`;
    }

    // Snake Animation
    if (extras.showSnake) {
        md += '## 🐍 Contribution Snake\n\n';
        md += `<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake.svg" />
    <img alt="Snake animation" src="https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake.svg" />
  </picture>
</p>\n\n`;
    }

    // Featured Projects
    if (projects.length > 0) {
        md += '## 💼 Featured Projects\n\n';

        // Separate GitHub and non-GitHub projects
        const githubProjects = projects.filter(p => p.link?.includes('github.com'));
        const otherProjects = projects.filter(p => p.name && p.link && !p.link.includes('github.com'));

        // GitHub projects as cards - use project-specific theme
        const projectTheme = (extras as any).projectTheme || stats.github.theme || 'tokyonight';
        if (githubProjects.length > 0) {
            md += '<p align="center">\n';
            githubProjects.forEach(p => {
                const repoPath = p.link!.replace('https://github.com/', '').replace('http://github.com/', '');
                const parts = repoPath.split('/').filter(Boolean);
                const owner = parts[0];
                const repo = parts[1]?.split('?')[0]?.split('#')[0]; // Remove query params and anchors
                if (owner && repo) {
                    md += `  <a href="${p.link}"><img width="48%" src="https://github-readme-stats-sigma-five.vercel.app/api/pin/?username=${owner.trim()}&repo=${repo.trim()}&theme=${projectTheme}&hide_border=true&show_description=true" /></a>\n`;
                }
            });
            md += '</p>\n\n';
        }

        // Non-GitHub projects aligned to match GitHub cards width (2 columns)
        if (otherProjects.length > 0) {
            md += '<p align="center">\n';
            md += '<table>\n';

            // Process projects in pairs for 2-column layout matching the featured cards
            for (let i = 0; i < otherProjects.length; i += 2) {
                const p1 = otherProjects[i];
                const p2 = otherProjects[i + 1];

                md += '  <tr>\n';

                // First column - 48% width to match github cards
                md += `    <td width="48%" align="center">\n`;
                md += `      <strong><a href="${p1.link}">${p1.name}</a></strong><br/>\n`;
                md += `      <sub>${p1.description || 'No description'}</sub><br/><br/>\n`;
                md += `      <a href="${p1.link}"><img src="https://img.shields.io/badge/Visit-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white" /></a>\n`;
                md += `    </td>\n`;

                // Second column (if exists)
                if (p2) {
                    md += `    <td width="48%" align="center">\n`;
                    md += `      <strong><a href="${p2.link}">${p2.name}</a></strong><br/>\n`;
                    md += `      <sub>${p2.description || 'No description'}</sub><br/><br/>\n`;
                    md += `      <a href="${p2.link}"><img src="https://img.shields.io/badge/Visit-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white" /></a>\n`;
                    md += `    </td>\n`;
                } else {
                    md += `    <td width="48%">&nbsp;</td>\n`;
                }

                md += '  </tr>\n';
            }
            md += '</table>\n';
            md += '</p>\n\n';
        }
    }

    // Dev Quote
    if (extras.showQuotes) {
        md += '## 💭 Dev Quote\n\n';
        if (customQuote) {
            md += `<p align="center"><em>"${customQuote}"</em></p>\n\n`;
        } else {
            md += `<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${quoteTheme}" />
</p>\n\n`;
        }
    }

    // Support Section
    if (support.buymeacoffee || support.kofi) {
        md += '## ☕ Support\n\n';
        md += '<p align="center">\n';
        if (support.buymeacoffee) {
            md += `  <a href="https://buymeacoffee.com/${support.buymeacoffee}"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" /></a>\n`;
        }
        if (support.kofi) {
            md += `  <a href="https://ko-fi.com/${support.kofi}"><img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white" /></a>\n`;
        }
        md += '</p>\n\n';
    }

    // Footer
    md += '---\n\n';
    md += `<p align="center">
  <strong>Thanks for visiting!</strong> ⭐ Star my repos if you like them!
</p>`;

    return md;
};
