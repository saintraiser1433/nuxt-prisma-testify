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
  ],
  css: ["sweetalert2/dist/sweetalert2.min.css"],
  plugins: ["~/plugins/generateRandom"],
  ssr: true,
  app: {
    head: {
      title: "Testify",
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

  vite: {
    plugins: [
      ViteComponents({
        resolvers: [IconsResolver()],
      }),
    ],
  },
});
