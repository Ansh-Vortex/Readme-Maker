'use client'

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Github, LogOut, Loader2 } from 'lucide-react';

export const GitHubAuth = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <Button disabled className="gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
            </Button>
        );
    }

    if (session) {
        const username = (session as any).username;
        const avatar = (session as any).avatar;

        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
                    <img
                        src={avatar}
                        alt={username}
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-green-400 font-medium">{username}</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-white/50 hover:text-white hover:bg-white/10 gap-1.5"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                </Button>
            </div>
        );
    }

    return (
        <Button
            onClick={() => signIn('github')}
            className="gap-2 bg-[#238636] hover:bg-[#2ea043] text-white"
        >
            <Github className="w-4 h-4" />
            Sign in with GitHub
        </Button>
    );
};
