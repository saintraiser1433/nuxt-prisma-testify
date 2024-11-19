import type { DecodeJWT } from "~/types";
import { jwtDecode } from "jwt-decode";
export default defineNuxtPlugin((event) => {
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
    async (to, from) => {
      const { token, validateToken, signOut } = useAuthentication();

      if (!token.value) {
        if (to.name !== "auth") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          return navigateTo({ name: "auth" });
        }
        return;
      }

      try {
        if (to.name !== "auth") {
          const store = storeUser();
          const decodedToken = jwtDecode<DecodeJWT>(token.value);
          const checkToken = await validateToken();
          if (!checkToken) {
            await signOut(store.getUser.id)
            return navigateTo({ name: "auth" });
          }

          if (decodedToken.role === "admin" && to.meta.requiredRole !== "admin") {
            return navigateTo({ name: "admin-home" });
          } else if (
            decodedToken.role === "examinee" &&
            to.meta.requiredRole !== "examinee"
          ) {
            return navigateTo({ name: "user" });
          } else if (
            decodedToken.role === "deans" &&
            to.meta.requiredRole !== "deans"
          ) {
            return navigateTo({ name: "deans-home" });
          }
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        return navigateTo({ name: "auth" });
      }
    },
    {
      global: true,
    }
  );
});
