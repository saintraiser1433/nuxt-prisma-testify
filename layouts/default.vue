<template>
    <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
        <!-- sidebar -->
        <AppMenu />
        <!-- header -->
        <AppNavBar />
        <!-- main -->
        <main :class="getToggleState ? 'lg:ml-60' : 'lg:ml-20'"
            class="col-span-3 px-5 pt-2 my-12 pb-8 transition-all ease-in-out">
            <div class="flex items-center flex-wrap justify-end pb-4">
                <!-- <BaseBreadCrumbs></BaseBreadCrumbs> -->
            </div>
            <slot />
        </main>

        <!-- footer -->
        <AppFooter footerName="Janzkiee Tech Solution" />


    </div>

    <teleport to="body">
        <div @click="store.toggleState" :class="getToggleState ? 'lg:hidden' : 'hidden lg:hidden'"
            class="block h-screen w-screen bg-[#171925] opacity-50 z-20 fixed top-0">
        </div>
    </teleport>





</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)

</script>

<style scoped></style>