<template>
  <div
    :class="
      store.getToggleState
        ? ' lg:w-[calc(100%-15rem)] lg:left-60'
        : 'lg:w-[calc(100%-5rem)] lg:left-20'
    "
    class="fixed top-0 bg-white dark:border-colorBorder dark:bg-darken py-2 border-b border-opacity-10 w-full col-span-2 transition-all ease-in-out"
  >
    <div class="mx-auto flex justify-between px-5">
      <button @click="store.toggleState">
        <i-solar-list-linear />
      </button>
      <ul class="flex justify-between items-center gap-3">
        <li>
          <a href="google.com">
            <i-bx-search />
          </a>
        </li>
        <li><i-heroicons-language /></li>
        <li class="flex items-center">
          <button
            @click="
              setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')
            "
          >
            <i-line-md-moon v-if="colorMode.value === 'dark'" />
            <i-lucide-sun v-else />
          </button>
        </li>
        <li><i-pixelarticons-add-grid /></li>
        <li><i-mdi-bell-outline /></li>
        <li>
          <div class="w-9 h-9 cursor-pointer relative group">
            <img
              src="@/assets/images/avatar.png"
              class="w-full h-full rounded-full"
              alt="Avatar Logo"
            />
            <ul
              class="profile absolute right-0 p-1 text-sm rounded-md w-36 border shadow-md hidden text-gray-500 bg-gray-100 dark:text-fontBase dark:bg-darken dark:border-colorBorder group-hover:block"
            >
              <li class="list__item-nav">
                <NuxtLink class="flex gap-2 items-center px-1" to="/">
                  <i-iconamoon-profile-circle />Profile
                </NuxtLink>
              </li>
              <li class="list__item-nav">
                <NuxtLink class="flex gap-2 items-center px-1" to="/"
                  ><i-fa-cogs />Settings</NuxtLink
                >
              </li>
              <li class="list__item-nav">
                <button
                  class="flex gap-2 items-center px-1"
                  @click="handleSignOut()"
                >
                  <i-majesticons-logout-half-circle-line />Logout
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const store = useStore();
const userStore = storeUser();
const colorMode = useColorMode();
const setColorTheme = (theme) => {
  colorMode.preference = theme;
};

const { signOut } = useAuthentication();

const handleSignOut = async () => {
  await signOut(userStore.getUser.id)
  return navigateTo({ name: 'auth' })
};
</script>

<style scoped></style>