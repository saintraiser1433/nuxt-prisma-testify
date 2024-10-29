<template>
    <div class="w-full rounded-lg shadow-lg bg-white dark:bg-cardColor py-2 px-4">
        <div v-if="title" :class="{ 'mb-3 border-b border-slate-100 dark:border-colorBorder py-2': title }"
            class="flex items-center">
            <div class="">
                <h1 class="text-2xl lg:text-lg">{{ title }}</h1>
                <span class="text-sm leading-none">{{ subtitle }}</span>
            </div>
            <div class="flex text-sm">
                <slot name="card-action"> </slot>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String
    }
})
</script>