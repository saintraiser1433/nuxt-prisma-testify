<script setup>
definePageMeta({
    auth: false,
    middleware: ['checkRole']
})
</script>

<template>
    <div>
        This is user
    </div>
</template>
