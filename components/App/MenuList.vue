<template>
    <div>
        <li v-for="(menu, ) in menuItems" :key="menu.routerName">

            <NuxtLink :to="{ name: menu.routerName }" class="list__item-child">
                <component :is="menu.icon" :class="{ 'lg:mx-auto': !getToggleState }" />
                <span class=" flex-grow text-capitalize" :class="!getToggleState ? 'lg:hidden' : ''">{{ menu.label
                    }}</span>
            </NuxtLink>
        </li>
    </div>

</template>

<script setup>

const store = useStore();
const { getToggleState } = storeToRefs(store)
defineProps({
    menuItems: Object
})

</script>

<style scoped></style>