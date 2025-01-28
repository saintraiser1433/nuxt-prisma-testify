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
const {$toast} = useNuxtApp();

const { data, status, error } = await useAPI<DashboardModel>('/dashboard/summary');
if (error.value) {
    $toast.error(error.value?.data.message || 'An error occurred while fetching')
}
</script>



<template>
    <HomeSummaryAnalytics :total-register="data?.summary.registeredExaminee" :total-completed="data?.summary.completedExaminee"
        :total-courses="data?.summary.totalCourse" :total-exams="data?.summary.totalExams" />
    <HomeAnalytics :reg-examinee="data?.regExaminee ?? []"></HomeAnalytics>
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
