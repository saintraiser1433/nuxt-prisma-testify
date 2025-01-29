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
const { $toast } = useNuxtApp();

const { data, status, error } = await useAPI<DashboardModel>('/dashboard/summary');
if (error.value) {
    $toast.error(error.value?.data.message || 'An error occurred while fetching')
}
const regExaminee = computed(() => data.value?.summary.registeredExaminee || 0);
const comExaminee = computed(() => data.value?.summary.completedExaminee || 0);
const totalCourses = computed(() => data.value?.summary.totalCourse || 0);
const totalExams = computed(() => data.value?.summary.totalExams || 0);
</script>



<template>
    <HomeSummaryAnalytics :total-register="regExaminee"
        :total-completed="comExaminee" :total-courses="totalCourses"
        :total-exams="totalExams" />
    <HomeAnalytics ></HomeAnalytics>
    <UICard :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
            <div class="flex justify-between items-center p-0">
                <div class="flex flex-col">
                    <h1 class="text-2xl lg:text-lg font-semibold">QUESTION PERCENTAGE</h1>
                </div>
                <svg-icon name="dashboard-icons/exam" title="examineeicon" width="32" height="32"></svg-icon>
            </div>
        </template>

        <!-- <HomeQuestionPercentage></HomeQuestionPercentage> -->
    </UICard>   

</template>
