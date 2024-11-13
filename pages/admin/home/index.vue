<template>
    <div>
        <button class="bg-primary">primary</button>
        <button class="bg-secondary">primary</button>
        <button class="bg-success">primary</button>
        <button class="bg-danger">primary</button>
        <button class="bg-warning">primary</button>
        <button class="bg-info">primary</button>
        <button class="bg-dark">primary</button>
        <button class="bg-darken">primary</button>
        <button class="bg-fontBase">primary</button>
        <button class="bg-cardColor">primary</button>
        <button class="bg-secondaryHover">primary</button>
        <button class="bg-modalColor">primary</button>
        <button class="bg-darkBody">primary</button>
        <button class="bg-colorBorder">primary</button>
    </div>

</template>

<script setup lang="ts">
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