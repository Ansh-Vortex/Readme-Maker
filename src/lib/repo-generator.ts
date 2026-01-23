import { RepoReadmeData, LICENSE_TEMPLATES, TECH_COLORS } from './repo-types';

export function generateRepoReadme(data: RepoReadmeData): string {
    const sections: string[] = [];
    const tocItems: string[] = [];

    // Header with logo and title
    if (data.projectInfo.name) {
        let header = '';

        // 1. Title (Centered)
        header += `<div align="center">\n`;

        if (data.projectInfo.logoUrl) {
            header += `  <img src="${data.projectInfo.logoUrl}" alt="${data.projectInfo.name} logo" width="120" />\n  <br/>\n`;
        }

        header += `  <h1>${data.projectInfo.name}</h1>\n`;

        // 2. Slogan/Tagline
        if (data.projectInfo.tagline) {
            header += `  <p>\n    <strong>${data.projectInfo.tagline}</strong>\n  </p>\n`;
        }

        // 3. Badges (License, Stars, etc.)
        let badgeRow = '';
        if (data.projectInfo.badges.length > 0) {
            badgeRow += data.projectInfo.badges.map(badge => {
                let url = badge.customUrl ||
                    `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.message)}-${badge.color}?style=for-the-badge&logo=${badge.logoName || ''}&logoColor=${badge.logoColor || 'white'}`;
                return `<img src="${url}" alt="${badge.label}" />`;
            }).join(' ');
        }

        // 4. Tech Stack Badges (Merged into header)
        if (data.techStack.length > 0) {
            const techBadges = data.techStack.map(tech => {
                const encodedTech = encodeURIComponent(tech);
                const colorKey = Object.keys(TECH_COLORS).find(k => k.toLowerCase() === tech.toLowerCase());
                const color = colorKey ? TECH_COLORS[colorKey] : '2d333b';
                return `<img src="https://img.shields.io/badge/${encodedTech}-${color}?style=for-the-badge&logo=${encodedTech}&logoColor=white" alt="${tech}" />`;
            }).join(' ');

            badgeRow += (badgeRow ? ' ' : '') + techBadges;
        }

        if (badgeRow) {
            header += `\n  <p>\n    ${badgeRow}\n  </p>\n`;
        }

        // 5. Website / Links
        const links: string[] = [];
        if (data.projectInfo.websiteUrl) {
            links.push(`[Website](${data.projectInfo.websiteUrl})`);
        }
        if (data.projectInfo.demoUrl) {
            links.push(`[Demo](${data.projectInfo.demoUrl})`);
        }
        if (links.length > 0) {
            header += `  <p>\n    ${links.join(' • ')}\n  </p>\n`;
        }

        header += `\n`;

        // 6. Description (Moved to Header, Centered)
        if (data.projectInfo.description) {
            header += `  <p>\n    ${data.projectInfo.description}\n  </p>\n`;
        }

        header += `</div>\n\n`; // End Center Div
        sections.push(header);
    }
    // removed separate About section as it is now in header

    // Installation
    if (data.installation.enabled) {
        let installSection = '## Installation\n\n';

        if (data.installation.prerequisites.length > 0) {
            installSection += '### Prerequisites\n\n';
            data.installation.prerequisites.forEach(prereq => {
                installSection += `- ${prereq}\n`;
            });
            installSection += '\n';
        }

        installSection += '### Quick Start\n\n';

        const pkgName = data.installation.packageName || data.projectInfo.name.toLowerCase().replace(/\s+/g, '-');

        if (pkgName) {
            installSection += '```bash\n';
            switch (data.installation.packageManager) {
                case 'npm':
                    installSection += `npm install ${pkgName}\n`;
                    break;
                case 'yarn':
                    installSection += `yarn add ${pkgName}\n`;
                    break;
                case 'pnpm':
                    installSection += `pnpm add ${pkgName}\n`;
                    break;
                case 'bun':
                    installSection += `bun add ${pkgName}\n`;
                    break;
            }
            installSection += '```\n\n';
        }

        if (data.installation.installCommands) {
            installSection += '```bash\n';
            installSection += data.installation.installCommands;
            installSection += '\n```\n\n';
        }

        if (data.installation.additionalSteps) {
            installSection += data.installation.additionalSteps + '\n';
        }

        sections.push(installSection);
        tocItems.push('- [Installation](#installation)');
    }

    // Usage
    if (data.usage.enabled) {
        let usageSection = '## Usage\n\n';

        if (data.usage.quickStart) {
            usageSection += data.usage.quickStart + '\n\n';
        }

        if (data.usage.examples.length > 0) {
            usageSection += '### Examples\n\n';
            data.usage.examples.forEach(example => {
                if (example.title) {
                    usageSection += `#### ${example.title}\n\n`;
                }
                usageSection += `\`\`\`${example.language}\n${example.code}\n\`\`\`\n\n`;
                if (example.output) {
                    usageSection += `**Output:**\n\`\`\`\n${example.output}\n\`\`\`\n\n`;
                }
            });
        }

        sections.push(usageSection);
        tocItems.push('- [Usage](#usage)');
    }

    // API Documentation
    if (data.apiDocs.enabled && data.apiDocs.endpoints.length > 0) {
        let apiSection = '## API Reference\n\n';

        if (data.apiDocs.description) {
            apiSection += data.apiDocs.description + '\n\n';
        }

        data.apiDocs.endpoints.forEach(endpoint => {
            apiSection += `### \`${endpoint.method}\` ${endpoint.path}\n\n`;
            if (endpoint.description) {
                apiSection += endpoint.description + '\n\n';
            }
            if (endpoint.parameters) {
                apiSection += '**Parameters:**\n\n';
                apiSection += endpoint.parameters + '\n\n';
            }
            if (endpoint.responseExample) {
                apiSection += '**Response:**\n\n```json\n' + endpoint.responseExample + '\n```\n\n';
            }
        });

        sections.push(apiSection);
        tocItems.push('- [API Reference](#api-reference)');
    }

    // Configuration
    if (data.configuration.enabled) {
        let configSection = '## Configuration\n\n';

        if (data.configuration.description) {
            configSection += data.configuration.description + '\n\n';
        }

        if (data.configuration.envVariables.length > 0) {
            configSection += '### Environment Variables\n\n';
            configSection += '| Variable | Type | Default | Required | Description |\n';
            configSection += '|----------|------|---------|----------|-------------|\n';
            data.configuration.envVariables.forEach(opt => {
                configSection += `| \`${opt.name}\` | ${opt.type} | ${opt.defaultValue || '-'} | ${opt.required ? 'Yes' : 'No'} | ${opt.description} |\n`;
            });
            configSection += '\n';
        }

        if (data.configuration.options.length > 0) {
            configSection += '### Options\n\n';
            configSection += '| Option | Type | Default | Description |\n';
            configSection += '|--------|------|---------|-------------|\n';
            data.configuration.options.forEach(opt => {
                configSection += `| \`${opt.name}\` | ${opt.type} | ${opt.defaultValue || '-'} | ${opt.description} |\n`;
            });
            configSection += '\n';
        }

        sections.push(configSection);
        tocItems.push('- [Configuration](#configuration)');
    }

    // Roadmap
    if (data.extras.roadmap.length > 0) {
        let roadmapSection = '## Roadmap\n\n';
        data.extras.roadmap.forEach(item => {
            roadmapSection += `- [${item.completed ? 'x' : ' '}] ${item.title}\n`;
        });
        sections.push(roadmapSection);
        tocItems.push('- [Roadmap](#roadmap)');
    }

    // FAQ
    if (data.extras.faq.length > 0) {
        let faqSection = '## FAQ\n\n';
        data.extras.faq.forEach(item => {
            faqSection += `<details>\n<summary><strong>${item.question}</strong></summary>\n\n${item.answer}\n\n</details>\n\n`;
        });
        sections.push(faqSection);
        tocItems.push('- [FAQ](#faq)');
    }

    // Contributing
    if (data.contributing.enabled) {
        let contribSection = '## Contributing\n\n';
        contribSection += data.contributing.guidelines + '\n\n';
        if (data.contributing.codeOfConductUrl) {
            contribSection += `Please read our [Code of Conduct](${data.contributing.codeOfConductUrl}) before contributing.\n`;
        }
        sections.push(contribSection);
        tocItems.push('- [Contributing](#contributing)');
    }

    // License
    if (data.license.enabled) {
        let licenseSection = '## License\n\n';
        const licenseName = LICENSE_TEMPLATES[data.license.type] || data.license.type;
        licenseSection += `This project is licensed under the ${licenseName}`;
        if (data.license.holder) {
            licenseSection += ` - Copyright © ${data.license.year} ${data.license.holder}`;
        }
        licenseSection += '.\n\n';
        if (data.license.type !== 'Custom') {
            licenseSection += `See the [LICENSE](LICENSE) file for details.\n`;
        } else if (data.license.customText) {
            licenseSection += data.license.customText + '\n';
        }
        sections.push(licenseSection);
        tocItems.push('- [License](#license)');
    }

    // Acknowledgments
    if (data.extras.acknowledgments) {
        let ackSection = '## Acknowledgments\n\n';
        ackSection += data.extras.acknowledgments + '\n';
        sections.push(ackSection);
        tocItems.push('- [Acknowledgments](#acknowledgments)');
    }

    // Author
    if (data.author.name || data.author.github) {
        let authorSection = '## Author\n\n';
        if (data.author.name) {
            authorSection += `**${data.author.name}**\n\n`;
        }
        const links: string[] = [];
        if (data.author.github) {
            links.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${data.author.github})`);
        }
        if (data.author.twitter) {
            links.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.author.twitter})`);
        }
        if (data.author.website) {
            links.push(`[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](${data.author.website})`);
        }
        if (links.length > 0) {
            authorSection += links.join(' ') + '\n';
        }
        sections.push(authorSection);
        tocItems.push('- [Author](#author)');
    }

    // Star reminder
    sections.push(`---\n\n<p align="center">\n  If you found this project useful, please consider giving it a ⭐!\n</p>\n`);

    // Replace TOC placeholder
    let result = sections.join('\n');

    if (data.extras.showTableOfContents && tocItems.length > 0) {
        const toc = '## Table of Contents\n\n' + tocItems.join('\n') + '\n';
        result = result.replace(tocPlaceholder, toc);
    } else {
        result = result.replace(tocPlaceholder + '\n', '');
    }

    return result;
}
