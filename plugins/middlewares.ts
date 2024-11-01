export default defineNuxtPlugin((event) => {
  addRouteMiddleware("checkExam", async (to, from) => {
    const id = Number(to.params.id);
    const { checkExistingExam } = useExam();
    const app = useNuxtApp();

    try {
      const response = await checkExistingExam(id);
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
      return app.runWithContext(() => navigateTo({ name: "exam" }));
    }
  });

  addRouteMiddleware("checkRole", async (to, from) => {
    const { status, getSession } = useAuth();
    const { setToast } = useToast();
    const session = await getSession();
    const requiredRole = to.meta.requiredRole;

    if (status.value === "unauthenticated") {
      if (to.name !== "auth") {
        return navigateTo("/auth");
      }
    }

    if (requiredRole !== "admin" && session.role !== "admin") {
      setToast("error", "Unauthorized");
      if (to.name !== "user") {
        return navigateTo({ name: "user" });
      }
    }


    if (session?.role !== "user") {
      setToast("error", "Unauthorized");
      if (to.name !== "admin-home") {
        return navigateTo({ name: "admin-home" });
      }
    }

  }
  );
});
