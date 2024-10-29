<template>
    <aside :class="getToggleState ? 'lg:w-60' : '-translate-x-full lg:w-20 lg:translate-x-0'" class="flex flex-col justify-between bg-white dark:bg-darken h-full row-span-2 px-2 py-2 z-50 shadow-lg 
      overflow-hidden border-r w-60 fixed left-0 top-0 border-slate-100 dark:border-colorBorder rounded-lg
      transition-all ease-in-out">
        <div class="flex ml-2 items-center border-b border-slate-300 dark:border-colorBorder pb-2 text-center mb-2">
            <span class="sprite sprite-small-lg ml-2"></span>
            <span :class="getToggleState ? 'lg:block' : 'lg:hidden'" class="font-titleFont font-bold text-lg ml-2">
                Testify</span>
        </div>
        <ul class="flex flex-col grow ">
            <AppMenuList></AppMenuList>
        </ul>

    </aside>
</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)
</script>

<style scoped></style>