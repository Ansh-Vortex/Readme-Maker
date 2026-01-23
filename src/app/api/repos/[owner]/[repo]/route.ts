import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ owner: string; repo: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session as any).accessToken) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const accessToken = (session as any).accessToken;
        const { owner, repo } = await params;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/vnd.github.v3+json',
        };

        // Fetch multiple data points in parallel
        const [repoData, languagesData, readmeData, packageJsonData, contributorsData] = await Promise.all([
            // Basic repo info
            fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }).then(r => r.json()),

            // Languages used
            fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }).then(r => r.json()),

            // Existing README (if any)
            fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers })
                .then(r => r.ok ? r.json() : null)
                .catch(() => null),

            // package.json (for Node.js projects)
            fetch(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`, { headers })
                .then(r => r.ok ? r.json() : null)
                .catch(() => null),

            // Top contributors
            fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`, { headers })
                .then(r => r.ok ? r.json() : [])
                .catch(() => []),
        ]);

        // ... previous standard fetches

        // Fetch additional key files for deep analysis
        const keyFiles = [
            'requirements.txt', // Python
            'pyproject.toml',   // Python
            'go.mod',          // Go
            'Cargo.toml',      // Rust
            'pom.xml',         // Java
            'composer.json',   // PHP
            'Gemfile',         // Ruby
            'Dockerfile',      // Docker
            'docker-compose.yml', // Docker
            'Makefile',        // General
            'tsconfig.json',   // TypeScript
            'next.config.js',  // Next.js
            'next.config.ts',  // Next.js
            'vite.config.ts',  // Vite
            'vite.config.js',  // Vite
        ];

        // Try to fetch contents of these files in parallel
        const filePromises = keyFiles.map(file =>
            fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, { headers })
                .then(r => r.ok ? r.json() : null)
                .then(data => data && data.content ? { name: file, content: Buffer.from(data.content, 'base64').toString('utf-8') } : null)
                .catch(() => null)
        );

        const fetchedFiles = (await Promise.all(filePromises)).filter((f): f is { name: string; content: string } => f !== null);

        // Convert to map for easy access
        const fileContents = fetchedFiles.reduce((acc, file) => {
            acc[file.name] = file.content;
            return acc;
        }, {} as Record<string, string>);

        // Parse package.json if exists
        let packageInfo = null;
        if (packageJsonData && packageJsonData.content) {
            try {
                const decoded = Buffer.from(packageJsonData.content, 'base64').toString('utf-8');
                packageInfo = JSON.parse(decoded);
                // Add package.json to fileContents as well for AI
                fileContents['package.json'] = decoded;
            } catch (e) {
                console.error('Failed to parse package.json:', e);
            }
        }

        // Decode existing README if exists
        let existingReadme = null;
        if (readmeData && readmeData.content) {
            try {
                existingReadme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
            } catch (e) {
                console.error('Failed to decode README:', e);
            }
        }

        // Calculate language percentages
        const totalBytes = Object.values(languagesData as Record<string, number>).reduce((a: number, b: number) => a + b, 0);
        const languagePercentages = Object.entries(languagesData as Record<string, number>).map(([lang, bytes]) => ({
            name: lang,
            percentage: Math.round((bytes / totalBytes) * 100),
            bytes,
        })).sort((a, b) => b.percentage - a.percentage);

        const analysis = {
            // Basic info
            name: repoData.name,
            fullName: repoData.full_name,
            description: repoData.description || '',
            private: repoData.private,
            htmlUrl: repoData.html_url,
            homepage: repoData.homepage,
            defaultBranch: repoData.default_branch,

            // Stats
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            openIssues: repoData.open_issues_count,
            size: repoData.size,

            // Features
            hasWiki: repoData.has_wiki,
            hasIssues: repoData.has_issues,
            hasProjects: repoData.has_projects,
            hasDiscussions: repoData.has_discussions,

            // Topics and license
            topics: repoData.topics || [],
            license: repoData.license?.spdx_id || null,
            licenseName: repoData.license?.name || null,

            // Languages
            primaryLanguage: repoData.language,
            languages: languagePercentages,

            // Deep Analysis Files
            fileContents: fileContents,

            // Package info (for Node.js)
            packageInfo: packageInfo ? {
                name: packageInfo.name,
                version: packageInfo.version,
                description: packageInfo.description,
                main: packageInfo.main,
                scripts: Object.keys(packageInfo.scripts || {}),
                dependencies: Object.keys(packageInfo.dependencies || {}),
                devDependencies: Object.keys(packageInfo.devDependencies || {}),
                keywords: packageInfo.keywords || [],
                author: packageInfo.author,
                license: packageInfo.license,
                repository: packageInfo.repository,
            } : null,

            // Contributors
            contributors: contributorsData.slice(0, 5).map((c: any) => ({
                login: c.login,
                avatar: c.avatar_url,
                contributions: c.contributions,
            })),

            // Existing README
            hasReadme: !!existingReadme,
            existingReadme: existingReadme,

            // Owner info
            owner: {
                login: repoData.owner.login,
                avatar: repoData.owner.avatar_url,
                type: repoData.owner.type,
            },

            // Dates
            createdAt: repoData.created_at,
            updatedAt: repoData.updated_at,
            pushedAt: repoData.pushed_at,
        };

        return NextResponse.json({ analysis });

    } catch (error: any) {
        console.error('Analyze repo error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to analyze repository' },
            { status: 500 }
        );
    }
}
