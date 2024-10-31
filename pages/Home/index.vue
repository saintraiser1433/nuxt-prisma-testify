<template>
    <div>
        <!-- <pre>{{ token }}</pre>
        <pre>{{ providers }}</pre> -->
        <!-- <pre>{{ session }}</pre> -->
        <!-- <div>Providers - {{ providers || 'no providers' }}</div>
        <pre>{{ session }}</pre> -->
        <pre>
            {{ data }}
        </pre>


    </div>

</template>

<script setup lang="ts">
const { data } = useAuth();
// const { data: session } = await useFetch('/api/me');
useHead({
    title: 'Testify Home Page',
    meta: [
        { name: "description", content: 'Testify Analytics' },
        { property: "og:title", content: 'Testify Home Page' },
        { property: "og:description", content: 'Testify Analytics' },
    ],
});

// console.log(refreshToken)

</script>
<style scoped></style>