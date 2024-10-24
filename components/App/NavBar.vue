<template>
    <div :class="getToggleState ? ' lg:w-[calc(100%-15rem)] lg:left-60' : 'lg:w-[calc(100%-5rem)] lg:left-20'"
        class="bg-darken py-2 border-b border-[#818181] border-opacity-10 fixed top-0  w-full col-span-2 transition-all ease-in-out">
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
                    <div class="w-9 h-9">
                        <img src="@/assets/images/avatar.png" class="w-full h-full rounded-full" alt="Avatar Logo" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)





</script>

<style scoped></style>