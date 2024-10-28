<template>
    <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
        <!-- sidebar -->
        <AppMenu />
        <!-- header -->
        <AppNavBar />
        <!-- main -->
        <main :class="isOpen ? 'lg:ml-60' : 'lg:ml-20'"
            class="col-span-3 px-5 pt-2 my-12 pb-8 transition-all ease-in-out">
            <div class="flex items-center flex-wrap justify-end pb-4">
                <!-- <BaseBreadCrumbs></BaseBreadCrumbs> -->
                {{ isOpen }}
            </div>
            <slot />
        </main>
        <!-- footer -->
        <AppFooter />


    </div>





</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)
const isOpen = getToggleState.value;

</script>

<style scoped></style>