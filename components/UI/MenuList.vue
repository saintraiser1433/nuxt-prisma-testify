<template>
    <li>
        <router-link :to="{ name: name }" class="list__item-child ">
            <i-gala-book class="text-center" :class="!isOpen ? 'lg:mx-auto' : ''" />
            <span class="flex-grow" :class="!isOpen ? 'lg:hidden' : ''">{{ title }}</span>
        </router-link>
    </li>
</template>

<script setup>

const isOpen = computed(() => store.getters.getToggleState);
defineProps({
    link: String,
    title: String
});



</script>
