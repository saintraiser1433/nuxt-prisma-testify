<template>
    <HomeSummaryAnalytics></HomeSummaryAnalytics>
    <HomeAnalytics></HomeAnalytics>
    <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
            <div class="flex justify-between items-center p-0">
                <div class="flex flex-col">
                    <h1 class="text-2xl lg:text-lg font-semibold">QUESTION PERCENTAGE</h1>
                </div>
                <svg-icon name="dashboard-icons/exam" title="examineeicon" width="32" height="32"></svg-icon>
            </div>
        </template>

        <HomeQuestionPercentage></HomeQuestionPercentage>
    </UICard>

</template>

<script setup lang="ts">

definePageMeta({
    requiredRole: 'admin',
});

useSeoMeta({
    title: 'Testify Home Page',
    description: 'Testify Analytics',
    ogTitle: 'Testify Home Page',
    ogDescription: 'Testify Analytics'
});







</script>

<style scoped>
/* Ensure the parent container is responsive */
</style>