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

useSeoMeta({
  title: 'Testify Home Page',
  description: 'Testify Analytics',
  ogTitle: 'Testify Home Page',
  ogDescription: 'Testify Analytics'
});



</script>
<style scoped></style>