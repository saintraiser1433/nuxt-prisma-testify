

<template>
  <div class="flex justify-center items-center max-w-sm lg:max-w-3xl mx-auto min-h-screen">
    <div class="w-full rounded-lg shadow-lg bg-white dark:bg-cardColor">
      <form @submit.prevent="handleSignIn">
        <div class="grid grid-cols-2">
          <div class="col-span-2 lg:col-span-1 py-12 px-10">
            <h1 class="text-2xl font-semibold uppercase text-gray-600">
              Welcome Back
            </h1>
            <span class="text-xs">Please enter login details below</span>
            <div class="">
              <div class="mt-5">
                <label for="username" class="text-gray-600 font-semibold">Username:</label>
                <UIInput class="mt-1 py-1" type="text" id="username" v-model="username" required />
              </div>
              <div class="mt-3">
                <label for="password" class="text-gray-600 font-semibold">Password:</label>
                <UIInput class="mt-1 rounded-full  py-1" type="password" id="password" v-model="password" required />
              </div>
              <div class="flex items-center gap-2 mt-5">
                <UICheckBox id="view"></UICheckBox>
                <label for="view" class="text-red-500 font-medium">View Password</label>
              </div>
              <div class="mt-5">
                <UIButton type="submit" class="ml-auto" variant="danger" :isRounded="true" size="block">
                  Sign In
                </UIButton>
              </div>
            </div>
          </div>
          <div
            class="lg:col-span-1 bg-[url('~/assets/images/background.jpg')] w-full h-auto bg-repeat bg-[center_bottom_-6rem]">
          </div>
        </div>
      </form>
      <!-- <button type="button" @click="handleGitHub">Sign In as github</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "empty",
  requiredRole: 'guest',
  // middleware: ['checkRole'],
});

const { setToast } = useToasts();
const username = ref("");
const password = ref("");
const { signIn } = useAuthentication();
const store = storeUser();

const handleSignIn = async () => {
  try {
    await signIn({
      username: username.value,
      password: password.value,
    });

    if (store.getUser) {
      const userRole = store.getUser.role;
      if (userRole === "admin") {
        return navigateTo({ name: "admin-home" });
      } else if (userRole === "examinee") {
        return navigateTo({ name: "user" });
      } else if (userRole === "deans") {
        return navigateTo({ name: "deans-home" });
      }
    }
    return navigateTo({ name: "auth" });
  } catch (err: any) {
    setToast("error", err.data?.error || "An error occurred");
  }
};
</script>

<style scoped></style>