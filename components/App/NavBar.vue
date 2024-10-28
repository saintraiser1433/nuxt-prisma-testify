<template>
    <div :class="getToggleState ? ' lg:w-[calc(100%-15rem)] lg:left-60' : 'lg:w-[calc(100%-5rem)] lg:left-20'"
        class="fixed top-0 bg-darken py-2 border-b border-[#818181] border-opacity-10  w-full col-span-2 transition-all ease-in-out">
        <div class="mx-auto flex justify-between px-5">
            <button @click="store.toggleState">
                <i-solar-list-linear />
            </button>
            <ul class="grid grid-cols-6 place-items-center">
                <li>
                    <a href="google.com">
                        <i-bx-search />
                    </a>
                </li>
                <li><i-heroicons-language /></li>
                <li><i-line-md-moon /></li>
                <li><i-pixelarticons-add-grid /></li>
                <li><i-mdi-bell-outline /></li>
                <li>
                    <div class="w-9 h-9 cursor-pointer" @click="isOpen = !isOpen">
                        <img src="@/assets/images/avatar.png" class="w-full h-full rounded-full" alt="Avatar Logo" />
                    </div>
                    <ul v-if="isOpen"
                        class="fixed p-2 right-5 text-sm rounded-md w-36 mt-2 bg-darken border border-colorBorder shadow-md">
                        <li class="py-1">
                            <NuxtLink class="flex gap-2 items-center px-1" to="/"><i-iconamoon-profile-circle />Profile
                            </NuxtLink>
                        </li>
                        <li class="py-1">
                            <NuxtLink class="flex gap-2 items-center px-1" to="/"><i-fa-cogs />Settings</NuxtLink>
                        </li>
                        <li class="py-1">
                            <NuxtLink class="flex gap-2 items-center px-1" to="/">
                                <i-majesticons-logout-half-circle-line />Logout
                            </NuxtLink>
                        </li>

                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)

const isOpen = ref(false);






</script>

<style scoped></style>