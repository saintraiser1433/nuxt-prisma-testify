<template>
    <ul class="flex text-sm">
        <li class="flex" v-for="(crumb, index) in breadcrumbs" :key="index">
            <div class="flex items-center" v-if="index === 0">
                <i-mynaui-home /> <i-iconamoon-arrow-right-2-bold />
            </div>
            <router-link class="underline" v-if="index !== breadcrumbs.length - 1" :to="getBreadcrumbPath(crumb)">{{
                crumb.meta.breadcrumbs
            }}</router-link>
            <span class="text-blue-100" v-else>{{ crumb.meta.breadcrumbs }}</span>
            <span class="flex items-center" v-if="index !== breadcrumbs.length - 1"> <i-iconamoon-arrow-right-2-bold />
            </span>
        </li>
    </ul>
</template>

<script setup>


// Get current route using useRoute
const route = useRoute()

// Compute breadcrumbs from matched routes, including children
const breadcrumbs = computed(() => {
    return route.matched.filter((r) => r.meta && r.meta.breadcrumbs)
})


const getBreadcrumbPath = (crumb) => {

    return {
        path: crumb.path,
        params: route.params
    }
}
</script>