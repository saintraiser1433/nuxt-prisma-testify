import { CircleProgressBar } from 'circle-progress.vue';

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.component('CircleProgressBar', CircleProgressBar)
})