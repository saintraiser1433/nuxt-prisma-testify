<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-4">
            <RecordInformation :data="dataResults" />
        
        </div>
        <div class="col-span-12 lg:col-span-8">
            <RecordCourseRecommend :data="topRankings" />
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



const { payload, static: stat } = useNuxtApp()
const { setToast } = useToasts();
const { getProgressBarColor } = useProgressBarColor();
const resultData = ref<GetScore[]>([]);
const status = ref(false);

const fetchResult = async () => {
    status.value = true;
    try {
        const { data, error } = await useAPI<GetScore[]>('/results', {
            getCachedData(key) {
                const data = payload.data[key] || stat.data[key]
                return data;
            },
            server: false
        })

        if (error.value) {
            throw new Error(error.value.message || 'Failed to fetch items')
        }

        resultData.value = data.value || [];
    } catch (error) {
        setToast('error', error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
        status.value = false;
    }
}

await fetchResult();



const dataResults = computed(() => {
    return resultData.value.map((item) => {
        const totalQuestions = Number(item.total_questions) || 0;
        const totalCorrectAnswers = Number(item.total_correct_answers) || 0;

        const successRate = totalQuestions > 0
            ? (totalCorrectAnswers / totalQuestions) * 100
            : 0;
        return {
            ...item,
            successRate,
            color: getProgressBarColor(successRate),
        };
    });

});

const topRankings = computed(() => {
    return dataResults.value
        .slice()
        .sort((a, b) => b.total_correct_answers - a.total_correct_answers)
        .slice(0, 10);
});












</script>
