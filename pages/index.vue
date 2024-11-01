<template>

    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['checkRole']
})



</script>

<style scoped></style>