<template>
    <div>
        <!-- <div class="absolute end-5 bottom-20">
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
        </div> -->
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
                <UserExamQuestions :session-data="sessionData" :question-data="questionData"
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
const store = useExamStore();
const { $api } = useNuxtApp();
const { setToast } = useToasts()
const { formatTime } = useFormatTime();
const inf = JSON.parse(info.value);

//rendering list of questions
const shouldRefetch = ref(0);
const answers = ref<Record<number, number>>({});
const isLoading = ref(false);

const examTitle = computed(() => question.value?.exam_title ?? 'Exam');
const answerCount = computed(() => Object.keys(answers.value).length);
const totalQuestions = computed(() => question.value?.data.length ?? 0);
const questionData = computed(() => question.value?.data ?? []);
const remainingTime = ref(0);
const sessionTime = computed(() => {
    let callBackTimer = 0;

    if (!sessionAnswer.value || !question.value) {
        return callBackTimer;
    }

    const sessionTime = sessionAnswer.value.length > 0
        ? sessionAnswer.value[0]?.timelimit
        : undefined;

    const questionTime = question.value.time_limit;

    return sessionTime ?? questionTime ?? callBackTimer;
});

const sessionData = computed(() => {
    if (!sessionAnswer.value || !sessionAnswer.value[0].sessionDetails) {
        return {};
    }
    const reducedAnswers = sessionAnswer.value[0].sessionDetails.reduce<Record<number, number>>((acc, item) => {
        acc[item.question_id] = item.choices_id;
        return acc;
    }, {});

    answers.value = reducedAnswers;
    return reducedAnswers;
});


const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch],
})

const { data: sessionAnswer, status: sessionStatus, error: sessionError } = await useAPI<SessionExamineeHeader[]>(`/answer/session/${inf.id}/${question.value?.exam_id}`, {
    watch: [shouldRefetch]
})



if (sessionError.value) {
    setToast('error', sessionError.value.message || 'An error occurred while fetching exam details');
}
if (error.value) {
    setToast('error', error.value.message || 'An error occurred while fetching exam details');
}


const pushAnswer = (payload: ExamAnswer) => {
    answers.value[payload.questionId] = payload.answerId;
    debounceSaveAnswer(payload.questionId, payload.answerId);

}

const sessionExamRepo = repository<ApiResponse<null>>($api);
const debounceSaveAnswer = useDebounceFn(async (questionId: number, answerId: number) => {
    if (!question.value?.time_limit || !question.value?.exam_id) {
        return setToast('error', 'Exam has not started yet');
    }
    await sessionExamRepo.insertExamSession({
        examinee_id: inf.id,
        time_limit: question.value.time_limit,
        exam_id: question.value.exam_id,
        question_id: questionId,
        choices_id: answerId
    });

}, 1000, { maxWait: 5000 })



//timer

const startTimerWithCallBack = (time: number, callback: () => void) => {
    const timer = setInterval(() => {
        remainingTime.value = time;
        if (remainingTime.value > 0) {
            remainingTime.value--;
            store.setTimeLimit(formatTime(remainingTime.value));
        } else {
            clearInterval(timer);
            callback();
        }

    }, 1000);
};








//submit exam


//   //submit exam
const examRepo = repository<ApiResponse<null>>($api);
const performSubmit = async (submitData: SubmitExamModel) => {
    isLoading.value = true;

    try {
        const { status, message } = await examRepo.submitExam(submitData);
        if (status === 201) {
            const sessionResponse = await sessionExamRepo.deleteExamSession(submitData);
            if (sessionResponse.status === 200) {
                answers.value = {};
                shouldRefetch.value++;
                return true;
            }

            setToast('error', sessionResponse.message || 'Failed to clear exam session');
            return false;
        }

        setToast('error', message || 'Failed to submit exam');
        return false;
    } catch (error: any) {
        setToast('error', error.data?.message || 'An error occurred');
        return false;
    } finally {
        isLoading.value = false;
    }
};


const submitExam = async () => {
    if (answerCount.value !== question.value?.data.length) {
        setToast('error', 'Please answer all questions before proceeding');
        return;
    }

    const data = Object.entries(answers.value).map(([questionId, choicesId]) => ({
        question_id: parseInt(questionId),
        choices_id: choicesId
    }));

    const submitData: SubmitExamModel = {
        examinee_id: inf.id,
        exam_id: question.value?.exam_id,
        details: data
    };

    await performSubmit(submitData);
};


watch(
    [
        () => sessionTime.value,
    ],
    async ([newTime],[oldTime]) => {
        if (newTime !== oldTime) {
            console.log('eqwe')
            startTimerWithCallBack(newTime, async () => await submitExam());
        }

    },
    {
        immediate: true,
        deep: true
    }
);






onMounted(() => {
    // useIntervalFn(() => {

    // }, 5000)

})









// watch(
//     [
//         () => question.value?.time_limit,
//         () => thesession.value?.timelimit,
//         () => thesession.value?.sessionDetails,
//         () => error.value
//     ],
//     async ([timeLimit, sessionTime, sessionDetails, errorValue]) => {
//         if (errorValue) {
//             store.setExam();
//             await navigateTo({ name: 'user-redirecting' });
//             return;
//         }
//         const finalTimeLimit = sessionTime ?? timeLimit ?? 0;

//         if (finalTimeLimit > 0) {
//             startTimerWithCallBack(finalTimeLimit, handleTimeUp);
//             isHighlightActive.value = false;
//         } else {
//             handleTimeUp();
//         }

//         if (sessionDetails && Array.isArray(sessionDetails) && sessionDetails.length > 0) {
//             for (const item of sessionDetails) {
//                 // Find question index
//                 const questionIndex = question.value?.data.findIndex(
//                     q => Number(q.question_id) === Number(item.question_id)
//                 );

//                 if (questionIndex === undefined || questionIndex === -1) continue;

//                 // Find choice index
//                 const choiceIndex = question.value?.data[questionIndex].choices.findIndex(
//                     c => Number(c.value) === Number(item.choices_id)
//                 );

//                 if (choiceIndex === undefined || choiceIndex === -1) continue;
//                 await pushData({
//                     indexQuestion: questionIndex,
//                     indexChoice: choiceIndex
//                 });
//             }
//         }
//     },
//     {
//         immediate: true,
//         deep: true
//     }
// );

</script>
