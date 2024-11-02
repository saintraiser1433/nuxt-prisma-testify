<template>
    <div>

    </div>
</template>

<script setup>
definePageMeta({
    requiredRole: 'admin',
    middleware: ['checkRole'],

})
useHead({
    title: 'Testify Rankings Module',
    meta: [
        { name: "description", content: 'CRUD for Rankings' },
        { property: "og:title", content: 'Testify Rankings Module' },
        { property: "og:description", content: 'CRUD for Rankings' },
    ],
});
</script>

<style scoped></style>