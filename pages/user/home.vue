<script setup>
definePageMeta({
    requiredRole: 'user',
    middleware: ['checkRole']
})
const { status, getSession } = useAuth();
</script>

<template>
    <div>
        {{ status }}
    </div>
</template>
