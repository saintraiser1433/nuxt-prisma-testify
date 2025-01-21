<script setup lang="ts">
import type { DashboardSummaryModel } from '#imports';

definePageMeta({
    requiredRole: 'admin',
});

useSeoMeta({
    title: 'Testify Home Page',
    description: 'Testify Analytics',
    ogTitle: 'Testify Home Page',
    ogDescription: 'Testify Analytics'
});
const { setToast } = useToasts();



const { data, status, error } = await useAPI<DashboardSummaryModel>('/dashboard/summary');
if (error.value) {
    setToast('error', error.value?.data.message || 'An error occurred while fetching exam details');
}
</script>



<template>

    <HomeSummaryAnalytics :total-register="data?.registeredExaminee" :total-completed="data?.completedExaminee"
        :total-courses="data?.totalCourse" :total-exams="data?.totalExams" />
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
