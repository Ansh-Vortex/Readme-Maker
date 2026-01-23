import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session as any).accessToken) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const accessToken = (session as any).accessToken;

        // Fetch all repositories (including private)
        const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated&type=all', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        // Return simplified repo data
        const simplified = repos.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            private: repo.private,
            language: repo.language,
            languages_url: repo.languages_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.updated_at,
            topics: repo.topics || [],
            homepage: repo.homepage,
            defaultBranch: repo.default_branch,
            size: repo.size,
            hasWiki: repo.has_wiki,
            hasIssues: repo.has_issues,
            license: repo.license?.spdx_id || null,
            htmlUrl: repo.html_url,
        }));

        return NextResponse.json({ repos: simplified });

    } catch (error: any) {
        console.error('Fetch repos error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch repositories' },
            { status: 500 }
        );
    }
}
