<template>
    <span class="badge" :class="[variant ? `bg-${variant}` : '']">
        <slot></slot>
    </span>
</template>

<script setup>
const props = defineProps({
    type: String,
    variant: String,

})
</script>
