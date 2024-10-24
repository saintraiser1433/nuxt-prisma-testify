<template>
    <div>
        <li>
            <NuxtLink :to="{ name: 'Home' }" class="list__item-child">
                <i-lucide-home :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Dashboard</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="{ name: 'Examinee' }" class="list__item-child">
                <i-fluent-hat-graduation-12-regular :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Examinee</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="{ name: 'Deans' }" class="list__item-child">
                <i-eos-icons-master-outlined class="text-center" :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Deans</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="{ name: 'Department' }" class="list__item-child">
                <i-gala-book class="text-center" :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Department</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="{ name: 'Course' }" class="list__item-child">
                <i-fluent-hat-graduation-12-regular class="text-center" :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Course</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="{ name: 'Exam' }" class="list__item-child">
                <i-fluent-hat-graduation-12-regular class="text-center" :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Exam</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="{ name: 'Rankings' }" class="list__item-child">
                <i-ph-ranking class="text-center" :class="!getToggleState ? 'lg:mx-auto' : ''" />
                <span class="flex-grow" :class="!getToggleState ? 'lg:hidden' : ''">Rankings</span>
            </NuxtLink>
        </li>
    </div>

</template>

<script setup>
const store = useStore();
const { getToggleState } = storeToRefs(store)

</script>

<style scoped></style>