import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: 'read:user user:email repo',
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.username = (profile as any).login;
                token.avatar = (profile as any).avatar_url;
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).username = token.username;
            (session as any).avatar = token.avatar;
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
