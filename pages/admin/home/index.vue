<template>
    <div>

    </div>

</template>

<script setup>
definePageMeta({
    requiredRole: 'admin',
    // middleware: ['checkRole'],
})



// const { data: session } = await useFetch('/api/me');
useHead({
    title: 'Testify Home Page',
    meta: [
        { name: "description", content: 'Testify Analytics' },
        { property: "og:title", content: 'Testify Home Page' },
        { property: "og:description", content: 'Testify Analytics' },
    ],
});

</script>
<style scoped></style>