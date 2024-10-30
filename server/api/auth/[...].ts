import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const config = useRuntimeConfig();

const getMe = async(session: any) => {
  return await $fetch('/api/me', {
    method: 'POST',
    body: {
      email: session?.user?.email
    }
  })
}

export default NuxtAuthHandler({
  pages: {
    signIn: "/auth",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // jwt: async ({ token, user }) => {
    //   const isSignIn = user ? true : false;
    //   if (isSignIn) {
    //     token.subscribed = user ? (user as any).subscribed || true : false;
    //   }
    //   return Promise.resolve(token);
    // },
    session: async ({ session, token }) => {
      const me = await getMe(session);
      (session as any).subscribed = me?.subscribed;
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
      name: "Credentials",

      async authorize(credentials: any, req: any) {
        const user = {
          username: 'johnrey',
          password: 'decosta'
        }
        console.log(credentials)
        if (credentials?.username === user.username && credentials?.password === user.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          console.log('error')
          return null;
        }
      },
    }),
  ],
});
