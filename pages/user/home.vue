<script setup>
definePageMeta({
    requiredRole: 'user',
    // middleware: ['checkRole']
})
// const { status, getSession } = useAuth();
</script>

<template>
    <div>
        User
        <!-- {{ status }} -->
    </div>
</template>
