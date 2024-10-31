import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
const config = useRuntimeConfig();

export default NuxtAuthHandler({
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.email = user.email;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).id = token?.id;
      (session as any).email = token?.email;
      return Promise.resolve(session);
    },
  },
  providers: [
    GithubProvider.default({
      clientId: config.public.gitClientID,
      clientSecret: config.gitSecretKey,
    }),

    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",

      async authorize(credentials: any, req: any) {
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials",
          });
        }

        const validatePassword = await bcrypt.compare(
          password,
          user?.hashedPassword
        );

        if (!validatePassword) {
          throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials",
          });
        }
        return user;
      },
    }),
  ],
});
