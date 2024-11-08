<template>
    <ul class="flex text-sm">
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex">
            <NuxtLink v-if="index !== breadcrumbs.length - 1" :to="{ path: crumb.path }">
                {{ crumb.meta.breadcrumbs }}
            </NuxtLink>
            <span v-else>{{ crumb.meta.breadcrumbs }}</span>
            <span v-if="index !== breadcrumbs.length - 1"> &gt; </span>
        </li>
    </ul>

</template>

<script setup lang="ts">

// Get the current route
const route = useRoute()

// Compute breadcrumbs from all matched routes
const breadcrumbs = computed(() => {
    return route.matched.filter((r) => r.meta && r.meta.breadcrumbs)
})

</script>