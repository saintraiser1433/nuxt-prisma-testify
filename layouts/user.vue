<template>
    <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
      <!-- header -->
      <AppUserNavbar />
      <!-- main -->
  
      <main
        class="col-span-3 px-5 pt-2 my-12 pb-8 transition-all ease-in-out">
        <div class="flex items-center flex-wrap justify-end pb-4">

        </div>
        <slot />
      </main>


      <!-- footer -->
      <AppUserFooter footerName="Janzkiee Tech Solution" />
  
    </div>
  </template>
  
  <script setup lang="ts">
  const user = storeUser();
  const { refreshToken, signOut } = useAuthentication();
  const { idle } = useIdle(50 * 10 * 1000);
  
  watch(idle, async (newValue: boolean) => {
    if (newValue) {
      await signOut(user.getUser?.id);
      return navigateTo({ name: "auth" });
    }
  });
  
  useIntervalFn(() => {
    refreshToken();
  }, 300000);
  </script>
  
  <style scoped></style>