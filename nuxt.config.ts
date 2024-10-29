// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteComponents from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
    "@prisma/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],

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
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  css: ["sweetalert2/dist/sweetalert2.min.css"],
  plugins: ["~/plugins/generateRandom"],
  ssr: true,

  vite: {
    plugins: [
      ViteComponents({
        resolvers: [IconsResolver()],
      }),
    ],
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {},
    viewer: true,
  },
});
