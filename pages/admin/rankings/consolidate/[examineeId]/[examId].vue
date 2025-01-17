<script lang="ts" setup>
definePageMeta({
    requiredRole: 'admin',
})

useSeoMeta({
    title: 'Testify User Exam',
    description: 'This is an examination page',
    ogTitle: 'Testify User Exam',
    ogDescription: 'This is an examination page',
});
const { info } = useAuthentication();
const { setToast } = useToasts()
const inf = JSON.parse(info.value);
const { params } = useRoute();

const initialQuestion = ref<ExamDetails | null>(null);
const initialSessionAnswer = ref<SessionExamineeHeader[] | null>(null);
const initialRemainingTime = ref(0);
const examQuestion = computed(() => question.value);
// const examSessionAnswer = computed(() => sessionAnswer.value);

//base exam
const {
    answers,
    examTitle,
    answerCount,
    totalQuestions,
    questionDetails,
} = useExam(initialQuestion, initialSessionAnswer, inf.id, initialRemainingTime)


//top level 
const { data: question, status, error } = await useAPI<ConsoQuestionAnswer[]>(`/answer/consolidate/${params.examineeId}/${params.examId}`)

// const { data: sessionAnswer, status: statusSession, error: sessionError } = await useAPI<SessionExamineeHeader[]>(`/answer/session/${inf.id}/${question.value?.exam_id}`)

// //error
// if (sessionError.value) {
//     setToast('error', error.value?.data.message || 'An error occurred while fetching exam details');
// }

if (error.value) {
    setToast('error', error.value?.data.message || 'An error occurred while fetching exam details');
}






</script>


<template>
    <div>
        <UICard :body="{ padding: 'sm:p-0 p-0', base: 'h-[73vh] lg:h-[76vh] w-full overflow-y-auto' }"
            :header="{ padding: 'sm:p-0 p-0' }" :footer="{
                base: 'flex justify-center items-center py-2 dark:bg-darken'
            }">
            <template #header>
                <UserDashboardHeader :title="examTitle">
                    <h1 class="text-white font-bold">SCORE: {{ answerCount }}/{{ totalQuestions }}</h1>
                </UserDashboardHeader>
            </template>
            <template #default>
                <RankingConsolidateAnswers :question-data="question ?? []" />
            </template>
        </UICard>
    </div>

</template>
