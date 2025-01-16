<script lang="ts" setup>
definePageMeta({
    requiredRole: 'admin'


})
useSeoMeta({
    title: 'Testify Rankings Module',
    description: 'Rankings',
    ogTitle: 'Testify Rankings Module',
    ogDescription: 'Rankings'
});
    const { params } = useRoute();
    const { $api } = useNuxtApp();
    
</script>

<template>
    <div>
    </div>
</template>
