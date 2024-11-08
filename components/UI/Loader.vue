<template>
    <loading-overlay :active="isLoading" :is-full-page="true" :loader="loader" :backgroundColor="bgOverlayColor" />
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    bgOverlayColor: {
        type: String,
        default: '#343434'
    },
    loader: {
        type: String,
        default: 'spinner'
    }


})

const { isLoading, loader, bgOverlayColor } = toRefs(props);

</script>