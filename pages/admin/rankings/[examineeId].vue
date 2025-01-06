<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-4">
            <RecordInformation :data="summaryData" />

        </div>
        <div class="col-span-12 lg:col-span-8">
            <RecordCourseRecommend :data="courseRecommended" />
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
const courseData = ref<CourseModel[]>([]);
const status = ref(false);
const summaryData = ref<SummaryResult[]>([]);
const courseRecommended = computed(() => {
    const correctAnswer =  summaryData.value[0].data.reduce((a, b) => a + b.total_correct_answer, 0);
    return courseData.value.filter((item) =>
        item.score <= correctAnswer
    )

})
const { data, error } = await useAPI<SummaryResult[]>(`/results/summary/${params.examineeId}`);

if(data.value){
    summaryData.value = data.value;
}

if (error.value) {
    setToast('error',error.value.message || 'Failed to fetch items')
}


const fetchCourse = async () => {
    status.value = true;
    try {
        const { data, error } = await useAPI<CourseModel[]>('/course')

        if (error.value) {
            throw new Error(error.value.message || 'Failed to fetch items')
        }

        courseData.value = data.value || [];
    } catch (error) {
        setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
        status.value = false;
    }
}

await fetchCourse();




















</script>
