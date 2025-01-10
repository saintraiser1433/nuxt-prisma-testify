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
                <UserExamQuestions :question-data="questionData" @push-data="pushData" />
            </template>

            <template #footer>
                <UButton :loading="isLoading" type="submit" color="gray" size="md" @click="submitExam" :ui="{
                    color: {
                        gray: {
                            solid: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600 disabled:bg-emerald-500 aria-disabled:bg-white'

                        }
                    }
                }">Submit Exam</UButton>
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
//rendering list of questions

const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch],
})
const { remainingSeconds, startTimerWithCallBack } = useExamTimer()
const {
    isHighlightActive,
    questionData,
    pushData,
    totalQuestions,
    answerCount,
    examTitle,
    findMissing,
    submitExam,
    handleTimeUp,
    isLoading,
    shouldRefetch
} = useExam(question,inf.id,remainingSeconds);

//submission of exam 


watch(
    [
        () => question.value?.time_limit,
        () => error.value
    ],
    async ([timeLimit, errorValue]) => {
        if (timeLimit) {
            startTimerWithCallBack(timeLimit, handleTimeUp);
            isHighlightActive.value = false;
        }
        if (errorValue) {
            store.setExam();
            await navigateTo({ name: 'user-redirecting' });
            return;
        }
    },
    {
        immediate: true,
        deep: true
    }
);

</script>
