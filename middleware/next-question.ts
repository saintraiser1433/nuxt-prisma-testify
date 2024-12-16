export default defineNuxtRouteMiddleware(async (to, from) => {
    type examsAvailable = { exam_id: number };
    const nuxtApp = useNuxtApp();
    const repo = repository<examsAvailable>(nuxtApp.$api);
    const { info } = useAuthentication();
    const inf = JSON.parse(info.value);

    const exam = await repo.getCheckExistingExam(inf.id)
    if (!exam) {
        return nuxtApp.runWithContext(() => navigateTo({ name: "user" }));
    }
    return;
})