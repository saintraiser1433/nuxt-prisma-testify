
export default defineNuxtPlugin((event) => {
  // addRouteMiddleware("checkExam", async (to, from) => {
  //   const id = Number(to.params.id);
  //   const { checkExistingExam } = useExam();
  //   const app = useNuxtApp();

  //   try {
  //     const response = await checkExistingExam(id);
  //     const title = response.exam_title || "Default Title";
  //     const description = response.description || "Not found";
  //     if (response) {
  //       useHead({
  //         title: title,
  //         meta: [
  //           { name: "description", content: description },
  //           { property: "og:title", content: title },
  //           { property: "og:description", content: description },
  //         ],
  //       });
  //       to.meta.examTitle = title;
  //       return;
  //     }
  //   } catch (error) {
  //     return app.runWithContext(() => navigateTo({ name: "exam" }));
  //   }
  });

  // addRouteMiddleware("checkRole", async (to, from) => {
  //   const { status, data } = useAuthState()
  //   const requiredRole = to.meta.requiredRole;

  //   if (status.value === 'unauthenticated' && to.name !== "auth") {
  //     return navigateTo("/auth");
  //   }

  //   if (status.value === "authenticated" && to.name === "auth") {
  //     if (data.value?.role === "admin") {
  //       return navigateTo("/admin/home");
  //     }
  //     if (data.value?.role === "user") {
  //       return navigateTo("/user/home");
  //     }
  //   }

  //   if (requiredRole && requiredRole !== data.value?.role) {
  //     return navigateTo("/error");
  //   }
  // });


// });
