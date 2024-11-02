import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
const config = useRuntimeConfig();
export default NuxtAuthHandler({
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 6000000,
    updateAge: 24 * 60 * 60,
  },
  //
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.role = user.role;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).id = token?.id;
      (session as any).role = token?.role;
      return Promise.resolve(session);
    },
  },
  providers: [
    GithubProvider.default({
      clientId: config.public.gitClientID,
      clientSecret: config.gitSecretKey,
    }),

    CredentialsProvider.default({
      name: "credentials",

      async authorize(credentials: any, req: any) {
        try {
          const user = await $fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          if (user) {
            return user;
          }

          return null;
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: err.statusMessage,
          });
        }
      },
    }),
  ],
});
