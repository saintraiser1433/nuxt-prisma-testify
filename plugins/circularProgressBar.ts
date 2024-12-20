import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.use(CircleProgress)
})