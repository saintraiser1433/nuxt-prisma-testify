<template>
    <div>
        <!-- <pre>{{ token }}</pre>
        <pre>{{ providers }}</pre> -->
        <!-- <pre>{{ session }}</pre> -->
        <!-- <div>Providers - {{ providers || 'no providers' }}</div>
        <pre>{{ session }}</pre> -->
        {{ data }}
        {{ status }}

    </div>

</template>

<script setup lang="ts">

// const headers = useRequestHeaders(['cookie']) as HeadersInit
// const { data: token } = await useFetch('/api/token/token', { headers })
const { data: providers } = await useFetch('/api/auth/providers');
const {
    status,
    data,
    lastRefreshedAt,
    token,
    refreshToken,
    getSession,
    signUp,
    signIn,
    signOut,
    refresh
} = useAuth()

// const { data: session } = await useFetch('/api/me');
useHead({
    title: 'Testify Home Page',
    meta: [
        { name: "description", content: 'Testify Analytics' },
        { property: "og:title", content: 'Testify Home Page' },
        { property: "og:description", content: 'Testify Analytics' },
    ],
});

console.log(refreshToken)

</script>
<style scoped></style>