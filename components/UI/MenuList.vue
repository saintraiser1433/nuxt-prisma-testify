<template>
    <li>
        <router-link :to="{ name: name }" class="list__item-child ">
            <i-gala-book class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">{{ title }}</span>
        </router-link>
    </li>
</template>

<script setup>
import { toRefs, computed } from 'vue';
const isOpen = computed(() => store.getters.getToggleState);



const props = defineProps({
    link: String,
    title: String
});

const { name, title } = toRefs(props);

</script>
