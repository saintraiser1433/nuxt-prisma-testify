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

const nuxtApp = useNuxtApp();
const { info } = useAuthentication();
const { setAlert } = useAlert();
const { setToast } = useToasts();
const store = useExamStore();
const inf = JSON.parse(info.value);
const { remainingSeconds, startTimerWithCallBack } = useExamTimer()
const isLoading = ref(false);
//rendering list of questions
const shouldRefetch = ref(0);
const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch],
})
const {
    isHighlightActive,
    questionData,
    pushData,
    answerData,
    totalQuestions,
    answerCount,
    examTitle,
    findMissing
} = useExam(question);

//submission of exam 
const repo = repository<ApiResponse<SubmitExamModel>>(nuxtApp.$api);
const submitExam = async () => {
    if (answerData.value.length !== question.value?.data.length) {
        setToast('error', 'Please answer all questions before proceeding');
        return;
    }
    const res = {
        examinee_id: inf.id,
        exam_id: question?.value?.exam_id,
        details: answerData.value
    }
    if (remainingSeconds.value > 0) {
        setAlert('info', 'Once submitted your answer will be processed ', '', 'Submit').then(
            async (result) => {
                if (result.isConfirmed) {
                    await performSubmit(res);
                }
            }
        )
    } else {
        await performSubmit(res);
    }
}

const performSubmit = async (res: SubmitExamModel) => {
    isLoading.value = true
    try {
        const { status, message } = await repo.submitExam(res);
        if (status === 201) {

            answerData.value = [];
            shouldRefetch.value++;
        } else {
            setToast('error', message || 'An error occurred');
        }
    } catch (error: any) {
        setToast('error', error.data.message || 'An error occurred');
    } finally {
        isLoading.value = false;
    }
}

const handleTimeUp = async () => {
    setToast('warning', 'Time\'s up');
    await submitExam();
};

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
