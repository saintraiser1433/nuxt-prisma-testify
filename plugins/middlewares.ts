const { setToast } = useToast();
export default defineNuxtPlugin((event) => {
  // addRouteMiddleware(
  //   "auth",
  //   () => {
  //     console.log(
  //       "this global middleware was added in a plugin and will be run on every route change"
  //     );
  //   },
  //   { global: true }
  // );

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
      return app.runWithContext(() => navigateTo({ name: "Exam" }));
    }
  });
});
