export default defineNuxtRouteMiddleware(async (to, from) => {

    const nuxtApp = useNuxtApp();
    const { info } = useAuthentication();
    const store = useExamStore()
    const repo = repository(nuxtApp.$api);

    const inf = JSON.parse(info.value);

    const exam = await repo.getCheckExistingExam<[]>(inf.id)
    if (exam.length === 0) {
        store.setExam();
        return nuxtApp.runWithContext(() => navigateTo({ name: "user" }));
    }
    return;
})