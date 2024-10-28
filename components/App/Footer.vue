<template>
    <footer :class="[
        getToggleState ? 'lg:ml-60 lg:w-[calc(100%-15rem)]' : 'lg:ml-20 lg:w-[calc(100%-5rem)]',
        'fixed bottom-0 col-span-2 col-start-2 w-full lg:px-5 text-center transition-all ease-in-out'
    ]">
        <div class="bg-darken py-2 rounded-md px-2">
            <p class="text-sm">Developed by: {{ footerName }}</p>
        </div>
    </footer>
</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)
defineProps({
    footerName: String
})
</script>

<style scoped></style>