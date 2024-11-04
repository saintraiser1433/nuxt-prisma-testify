export default defineNuxtPlugin({
    async setup() {
        const config = useRuntimeConfig()
        const api = $fetch.create({
            baseURL: config.public.baseURL
        })

        return {
            provide: {
                api
            }
        }

    }

})