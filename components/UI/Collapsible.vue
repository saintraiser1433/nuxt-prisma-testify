<template>

    <li class="collapsible" :class="[isCollapse ? 'collapsible--extend' : '']">
        <div class="list__item-child" @click="collapse">
            <slot name="icon"></slot>
            <span class="flex-grow">{{ title }}</span>
            <i-octicon-chevron-right-12 class="collapsible__chevron" />
        </div>
        <ul class="collapsible__content lg:fixed xl:fixed ">
            <li class="mt-1" v-for="child in children" :key="child">
                <router-link :to="{ name: child.routeName }" class="list__item-child">
                    <i-mdi-radiobox-indeterminate-variant class="text-center" />
                    <span class="flex-grow ">{{ child.tabName }}</span>
                </router-link>
            </li>
        </ul>
    </li>

</template>

<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import { useRoute } from "vue-router";

defineProps({
    title: String,
    children: Object
})
const route = useRoute();






/* Collapse */
const isCollapse = ref(false);
const collapse = () => {
    isCollapse.value = !isCollapse.value;
}
</script>
