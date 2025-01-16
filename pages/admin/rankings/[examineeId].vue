<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-4">
            <RecordInformation :data="summaryData" />

        </div>
        <div class="col-span-12 lg:col-span-8">
            <RecordCourseRecommend :is-loading="statuses" :data="courseRecommended" />
        </div>
    </div>
</template>

<script setup lang="ts">


definePageMeta({
    requiredRole: 'admin',

})
useSeoMeta({
    title: 'Testify Rankings Module',
    description: 'Rankings',
    ogTitle: 'Testify Rankings Module',
    ogDescription: 'Rankings'
});



const { setToast } = useToasts();
const { params } = useRoute();
const { $api } = useNuxtApp();
const courseData = computed(() => data.value?.course || []);
const statuses = computed(() => status.value === 'pending');
const summaryData = computed(() => data.value?.summary || []);


const courseRecommended = computed(() => {

    const correctAnswer = summaryData.value[0].data.reduce((a, b) => a + b.total_correct_answer, 0);
    return courseData.value.filter((item) =>
        item.score <= correctAnswer
    )

})


const { data, status, error } = await useAsyncData('ranks', async () => {
    const [course, summary] = await Promise.all([
        $api<CourseModel[]>(`/course`),
        $api<SummaryResult[]>(`/results/summary/${params.examineeId}`),
    ]);
    return {
        course,
        summary
    };
},{
    server:false
});

if(error.value){
    setToast('error', error.value.message || 'Failed to fetch items')
}



</script>



