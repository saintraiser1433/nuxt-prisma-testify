import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
const config = useRuntimeConfig();
export default NuxtAuthHandler({
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.subscribed = user ? (user as any).subscribed || true : false;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).subscribed = token.subscribed;
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
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials: any, req: any) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials) {
          // Any object returned will be saved in `user` property of the JWT
          return credentials;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
});
