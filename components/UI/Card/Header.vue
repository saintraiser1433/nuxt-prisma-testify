<script lang="ts" setup>

</script>

<template>
    <!-- <div v-if="title" :class="{ 'mb-3 border-b border-slate-100 dark:border-colorBorder py-2': title }"
        class="flex items-center">
        <div class="">
            <h1 class="text-2xl lg:text-lg">{{ title }}</h1>
            <span class="text-sm leading-none">{{ subtitle }}</span>
        </div>
        <div class="flex text-sm">
            <slot name="card-action"> </slot>
        </div>
    </div> -->

    <div class="flex items-center mb-3 border-b border-slate-100 dark:border-colorBorder py-2">
        <slot></slot>
    </div>

</template>

<style scoped></style>
