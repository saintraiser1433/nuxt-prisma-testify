<template>
  <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
    <!-- sidebar -->
    <AppMenu />
    <!-- header -->
    <AppNavBar />
    <!-- main -->
    <main :class="store.getToggleState ? 'lg:ml-60' : 'lg:ml-20'"
      class="col-span-3 px-5 pt-2 my-12 pb-8 transition-all ease-in-out">
      <div class="flex items-center flex-wrap justify-end pb-4">
      </div>
      <slot />
    </main>

    <!-- footer -->
    <AppFooter footerName="Janzkiee Tech Solution" />

    <teleport to="body">
      <div @click="store.toggleState" :class="store.getToggleState ? 'lg:hidden' : 'hidden lg:hidden'"
        class="block h-screen w-screen bg-[#171925] opacity-50 z-20 fixed top-0"></div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
const user = storeUser();
const { refreshToken, signOut } = useAuthentication();
const { idle } = useIdle(50 * 10 * 1000);

watch(idle, async (newValue: boolean) => {
  if (newValue) {
    await signOut(user.getUser?.id);
    await navigateTo({ name: "auth" });
  }
});

useIntervalFn(() => {
  refreshToken();
}, 300000);
</script>

<style scoped></style>