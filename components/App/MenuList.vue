<template>
    <div>
        <li v-for="(menu, ) in menuItems" :key="menu.routerName">

            <NuxtLink :to="{ name: menu.routerName }" class="list__item-child">
                <component :is="menu.icon" :class="{ 'lg:mx-auto': !store.getToggleState }" />
                <span class=" flex-grow text-capitalize" :class="!store.getToggleState ? 'lg:hidden' : ''">{{ menu.label
                    }}</span>
            </NuxtLink>
        </li>
    </div>

</template>

<script setup>

const store = useStore();
defineProps({
    menuItems: Object
})

</script>

<style scoped></style>