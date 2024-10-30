<template>
    <div>
        <div>{{ token || 'no token present, are you logged in?' }}</div>
        <div>{{ providers || 'no providers' }}</div>
    </div>

</template>

<script setup>
const headers = useRequestHeaders(['cookie'])
const { data: token } = await useFetch('/api/token/token', { headers })
const { data: providers } = await useFetch('/api/auth/providers');
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