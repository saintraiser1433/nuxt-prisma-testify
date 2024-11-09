export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const api = $fetch.create({
        baseURL: config.public.baseURL,
        onRequest({ request, options, error }) {
            const { token } = useAuthentication()
            if (token.value) {
                options.headers.set('Content-Type', 'application/json');
                options.headers.set('Authorization', `Bearer ${token.value}`)
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo('/auth'))
            }
        }
    })
    return {
        provide: {
            api
        }
    }
})