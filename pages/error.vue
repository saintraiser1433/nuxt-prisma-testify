<script setup>
definePageMeta({
    layout: 'empty',

})

const { status } = useAuth();


</script>

<template>

    <div>
        <pre>{{ status }}</pre>
    </div>
</template>

<style scoped></style>
