
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
  // });


  addRouteMiddleware("auth", async (to, from) => {
    const { getStatus } = useAuthentication()
    const { user, status } = await getStatus();
    // to.meta.id = user;

    if (status === 'unauthenticated' && to.name !== "auth") {
      return navigateTo("/auth");
    }
    if (status === "authenticated" && to.name === "auth") {
      if (user.role === 'admin') {
        return navigateTo({ name: 'admin-home' });
      } else if (user.role === 'examinee') {
        return navigateTo({ name: 'user-home' });
      }
    }

  }, {
    global: true
  }

  )




});
