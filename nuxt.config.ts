// // https://nuxt.com/docs/api/configuration/nuxt-config
import ViteComponents from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
export default defineNuxtConfig({
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
    globalAppMiddleware: true,
    isEnabled: true,
    provider: {
      type: 'authjs',
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: true,
    }
  },
  compatibilityDate: "2024-04-03",
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  css: ["sweetalert2/dist/sweetalert2.min.css"],
  devtools: { enabled: true },
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
    "@prisma/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-auth",
  ],
  plugins: ["~/plugins/generateRandom"],

  runtimeConfig: {
    gitSecretKey: process.env.GITHUB_SECRET_KEY,
    public: {
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
