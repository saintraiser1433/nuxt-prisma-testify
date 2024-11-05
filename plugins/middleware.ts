import type { DecodeJWT } from "~/types";
import { jwtDecode } from 'jwt-decode';
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
    const { token, signOut } = useAuthentication()

    const config = useRuntimeConfig()
    // const status = ref('');
    // const role = ref<Role>('');
    // const store: any = storeUser();

    if (!token) {

      if (to.name !== 'auth') {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return navigateTo({ name: 'auth' });
      }
      return;
    }

    try {
      const decodedToken = jwtDecode<DecodeJWT>(token);

      // You can check for expiration here if needed
      const currentTime = Date.now();
      const isExpired = decodedToken.exp !== undefined && (decodedToken.exp * 1000 < currentTime);
      if (isExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return navigateTo({ name: 'auth' });
      }

      // Check user role and navigate accordingly
      if (decodedToken.role === 'admin' && to.meta.requiredRole !== 'admin') {
        return navigateTo({ name: 'admin-home' });
      } else if (decodedToken.role === 'examinee' && to.meta.requiredRole !== 'examinee') {
        return navigateTo({ name: 'user-home' });
      } else if (decodedToken.role === 'deans' && to.meta.requiredRole !== 'deans') {
        return navigateTo({ name: 'deans-home' });
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return navigateTo({ name: 'auth' });
    }
  }, {
    global: true
  });
});
