<template>
    <div>
        <div class="absolute end-5 bottom-20">
            <UButton type="button" @click="findMissing" variant="solid" color="gray" size="lg" :ui="{
                color: {
                    gray: {
                        solid: 'bg-neon-carrot-500 hover:bg-neon-carrot-600 dark:bg-neon-carrot-500 text-white hover:dark:bg-neon-carrot-600 disabled:bg-neon-carrot-500 aria-disabled:bg-white'

                    }
                }
            }">
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
                <UserExamQuestions :session-data="thesession" :question-data="questionData" @push-data="pushData" />
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
const store = useExamStore();
const inf = JSON.parse(info.value);
const { setToast } = useToasts()
//rendering list of questions
const thequestion = computed(() => question.value);
const thesession = computed(() => {
    if (Array.isArray(sessionAnswer.value) && sessionAnswer.value.length > 0) {
        return sessionAnswer.value[0];
    }
    return null;
});

const { remainingSeconds, startTimerWithCallBack } = useExamTimer()
const {
    isHighlightActive,
    questionData,
    totalQuestions,
    answerCount,
    examTitle,
    isLoading,
    shouldRefetch,
    pushData,
    findMissing,
    submitExam,
    handleTimeUp,
} = useExam(thequestion, inf.id, remainingSeconds);

const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch],
})

const { data: sessionAnswer, status: sessionStatus, error: sessionError } = await useAPI<SessionExamineeHeader>(`/answer/session/${inf.id}/${thequestion.value?.exam_id}`, {
    watch: [shouldRefetch]
})

if (sessionError.value) {
    setToast('error', sessionError.value.message || 'An error occurred while fetching exam details');
}
if (error.value) {
    setToast('error', error.value.message || 'An error occurred while fetching exam details');
}



watch(
    [
        () => question.value?.time_limit,
        () => thesession.value?.timelimit,
        () => thesession.value?.sessionDetails,
        () => error.value
    ],
    async ([timeLimit, sessionTime, sessionDetails, errorValue]) => {
        if (errorValue) {
            store.setExam();
            await navigateTo({ name: 'user-redirecting' });
            return;
        }
        const finalTimeLimit = sessionTime ?? timeLimit ?? 0;

        if (finalTimeLimit > 0) {
            startTimerWithCallBack(finalTimeLimit, handleTimeUp);
            isHighlightActive.value = false;
        } else {
            handleTimeUp();
        }

        if (sessionDetails && Array.isArray(sessionDetails) && sessionDetails.length > 0) {
            for (const item of sessionDetails) {
                // Find question index
                const questionIndex = question.value?.data.findIndex(
                    q => Number(q.question_id) === Number(item.question_id)
                );

                if (questionIndex === undefined || questionIndex === -1) continue;

                // Find choice index
                const choiceIndex = question.value?.data[questionIndex].choices.findIndex(
                    c => Number(c.value) === Number(item.choices_id)
                );

                if (choiceIndex === undefined || choiceIndex === -1) continue;
                await pushData({
                    indexQuestion: questionIndex,
                    indexChoice: choiceIndex
                });
            }
        }
    },
    {
        immediate: true,
        deep: true
    }
);

</script>
