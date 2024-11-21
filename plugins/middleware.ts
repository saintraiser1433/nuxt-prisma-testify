export default defineNuxtPlugin((event) => {

  const ROLE_REDIRECTS: Record<Role, string> = {
    admin: 'admin-home',
    examinee: 'user',
    deans: 'deans-home'
  };

  const GUEST_ROUTES = ['auth', 'auth-signup']



  addRouteMiddleware("checkExam", async (to, from) => {
    const id = Number(to.params.id);
    const nuxtApp = useNuxtApp();
    const examRepo = repository(nuxtApp.$api);
    try {
      const response = await examRepo.getExamId(id);
      const title = response.exam_title || "Default Title";
      const description = response.description || "Not found";
      if (response) {
        useHead({
          title: title,
          meta: [
            { name: "description", content: description },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
          ],
        });
        to.meta.examTitle = title;
        return;
      }
    } catch (error) {
      return nuxtApp.runWithContext(() => navigateTo({ name: "exam" }));
    }
  });

  addRouteMiddleware(
    "auth",
    (to, from) => {

      const { token, clearAuthTokens, info } = useAuthentication();
      const inf = JSON.parse(info.value);

      if (!token.value) {
        if (to.name !== 'auth') {
          clearAuthTokens();
          return navigateTo({ name: "auth" });
        }
        return;
      }
      try {

        if (GUEST_ROUTES.some(route => route === to.name)) {
          return;
        }
        const userRole = inf.role as Role;
        const requiredRole = to.meta.requiredRole as Role;
        if (userRole && requiredRole && userRole !== requiredRole) {
          return navigateTo({ name: ROLE_REDIRECTS[userRole] });
        }

      } catch (error) {
        clearAuthTokens();
        return navigateTo({ name: "auth" });
      }
    },
    {
      global: true,
    }


  );
});
