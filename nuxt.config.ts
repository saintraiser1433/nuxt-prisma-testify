// // https://nuxt.com/docs/api/configuration/nuxt-config
import ViteComponents from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  routeRules: {
    '/': { redirect: '/auth' },
  },
  app: {
    head: {
      title: "Testify",
      link: [
        {
          rel: "icon",
          type: "image/x-icon", // or 'image/x-icon' if using .ico
          href: "/favicon.ico", // Update this path if using a different filename or format
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
  },
  auth: {
    // globalAppMiddleware: true,
    // baseURL: process.env.BASE_API_URL,
    // provider: {
    //   type: 'local',
    //   endpoints: {
    //     signIn: { path: '/login', method: 'post' },
    //     signOut: { path: '/logout', method: 'post' },
    //     signUp: { path: '/register', method: 'post' },
    //     getSession: { path: '/session', method: 'get' },
    //   },
    //   pages: {
    //     login: '/auth',
    //   },
    //   token: {
    //     signInResponseTokenPointer: '/token',
    //     type: 'Bearer',
    //     cookieName: 'auth.token',
    //     headerName: 'Authorization',
    //     maxAgeInSeconds: 1800,
    //     cookieDomain: 'sidebase.io',
    //     secureCookieAttribute: false,
    //     httpOnlyCookieAttribute: false,
    //   },
    // },

    // sessionRefresh: {
    //   enablePeriodically: true,
    //   enableOnWindowFocus: true,
    // }


  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  css: ["sweetalert2/dist/sweetalert2.min.css"],
  devtools: { enabled: true },
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "lib/api/*.ts"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-auth",
  ],
  plugins: ["~/plugins/generateRandom"],

  runtimeConfig: {
    gitSecretKey: process.env.GITHUB_SECRET_KEY,
    accessTokenSecret: process.env.NUXT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.NUXT_REFRESH_TOKEN_SECRET,
    public: {
      baseURL: process.env.BASE_API_URL,
      // baseURL: process.env.NUXT_PUBLIC_BASE_URL,
      gitClientID: process.env.GITHUB_CLIENT_ID,
    },
  },
  ssr: false,

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {},
    viewer: true,
  },
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [IconsResolver()],
      }),
    ],
  },
});