<template>
    <div>
        {{ question?.time_limit }}
        <div class="absolute end-5 bottom-20">
            <UButton type="button" @click="findMissing" variant="solid" color="gray" size="lg" :ui="BTN_FINDMISSING">
                <i-fluent-emoji-flat-magnifying-glass-tilted-left />
                Find my missing
            </UButton>
        </div>
        <UICard :has-footer="true"
            :body="{ padding: 'sm:p-0 p-0', base: 'h-[73vh] lg:h-[76vh] w-full overflow-y-auto' }"
            :header="{ padding: 'sm:p-0 p-0' }" :footer="{
                base: 'flex justify-center items-center py-2 dark:bg-darken'
            }">
            <template #header>
                <UserDashboardHeader :title="examTitle">
                    <h1 class="text-white font-bold">ITEMS ANSWERED: {{ answerCount }}/{{ totalQuestions }}</h1>
                </UserDashboardHeader>
            </template>
            <template #default>
                <UserExamQuestions :session-data="sessionAnswerData" :question-data="questionDetails"
                    @push-answer="pushAnswer" />
            </template>

            <template #footer>
                <UButton :loading="isLoading" type="submit" color="gray" size="md" @click="submitExam"
                    :ui="BUTTON_UI_CONFIG">Submit Exam</UButton>
            </template>
        </UICard>
    </div>

</template>


<script lang="ts" setup>
definePageMeta({
    requiredRole: 'examinee',
    layout: 'user',
    middleware: 'next-question'
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

const initialQuestion = ref<ExamDetails | null>(null);
const initialSessionAnswer = ref<SessionExamineeHeader[] | null>(null);
const initialRemainingTime = ref(0);
const examQuestion = computed(() => question.value);
const examSessionAnswer = computed(() => sessionAnswer.value);
const timeLimit = computed(() => sessionDetails.value?.timelimit ?? question.value?.time_limit ?? 0);

//base exam
const {
    findMissing,
    submitExam,
    shouldRefetch,
    answers,
    examTitle,
    answerCount,
    totalQuestions,
    questionDetails,
    isLoading,
} = useExam(initialQuestion, initialSessionAnswer, inf.id, initialRemainingTime)


//top level 
const { data: question, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch],
})

const { data: sessionAnswer, error: sessionError } = await useAPI<SessionExamineeHeader[]>(`/answer/session/${inf.id}/${question.value?.exam_id}`, {
    watch: [shouldRefetch]
})

//error
if (sessionError.value) {
    setToast('error', error.value?.data.message || 'An error occurred while fetching exam details');
}

if (error.value) {
    setToast('error', error.value?.data.message || 'An error occurred while fetching exam details');
}


//timer
const {
    remainingTime,
    clearExistingTimer,
    clearExistingTimeSession,
    startTimerWithCallBack,
    updateSessionTimer
} = useExamTimer(inf.id, examQuestion.value?.exam_id)



//sessions
const {
    pushAnswer,
    sessionDetails,
    sessionAnswerData
} = useExamSession(question, sessionAnswer, answers, inf.id)


watch(
    [examQuestion, examSessionAnswer, remainingTime],
    ([newQuestion, newSessionAnswer, newRemainingTime]) => {
        initialQuestion.value = newQuestion;
        initialSessionAnswer.value = newSessionAnswer;
        initialRemainingTime.value = newRemainingTime;
    },
    { immediate: true }
);



watch(() => error.value?.data.status, async (newError) => {
    if (newError && newError === 404) {
        await navigateTo({ name: 'user-redirecting' });
    }
})


watch(() => timeLimit.value, async (newTime, oldTime) => {
    if (newTime === oldTime || newTime !== oldTime) {
        startTimerWithCallBack(newTime, async () => await submitExam());
    }
}, {
    immediate: true
})




onMounted(() => {
    updateSessionTimer();
})

onUnmounted(() => {
    clearExistingTimer();
    clearExistingTimeSession();
})
</script>
