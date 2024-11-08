<template>
    <span class="badge" :class="[variant ? `bg-${variant}` : '']">
        <slot></slot>
    </span>
</template>

<script setup lang="ts">
defineProps({
    type: String,
    variant: String,

})
</script>
