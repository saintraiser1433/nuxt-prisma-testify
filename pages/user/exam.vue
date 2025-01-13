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
                <UserExamQuestions :session-data="sessionData" :question-data="questionData"
                    @push-answer="pushAnswer" />
            </template>

            <template #footer>
                <UButton :loading="isLoading" type="submit" color="gray" size="md" @click="submitExam"
                    :ui="BUTTON_UI_CONFIG">Submit Exam</UButton>
            </template>
        </UICard>
    </div>
    {{ answerCount }}
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
const { setAlert } = useAlert();
const inf = JSON.parse(info.value);

//rendering list of questions
const shouldRefetch = ref(0);
const answers = ref<Record<number, number>>({});
const isLoading = ref(false);
const showUnanswered = ref(false);
const remainingTime = ref(0);
const examTitle = computed(() => question.value?.exam_title ?? 'Exam');
const answerCount = computed(() => Object.keys(answers.value).length);
const totalQuestions = computed(() => question.value?.data.length ?? 0);
const questionData = computed(() => {
    if (!question.value) return [];
    const answeredIds = new Set(Object.keys(answers.value).map(item => Number(item)));
    return question.value.data.map((item) => {
        const isAnswered = answeredIds.has(Number(item.question_id));
        const highlightClass = !isAnswered && showUnanswered.value
            ? 'bg-red-400 dark:bg-red-500'
            : '';

        return {
            question_id: {
                value: Number(item.question_id),
                class: highlightClass,
            },
            question: {
                value: String(item.question),
                class: highlightClass,
            },
            choices: item.choices
        };
    });
});


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

    if (!sessionAnswer.value || !sessionAnswer.value[0]?.sessionDetails) {
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
    answers.value = { ...answers.value, [payload.questionId]: payload.answerId };
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
    remainingTime.value = time;
    useIntervalFn(() => {
        if (remainingTime.value > 0) {
            remainingTime.value--;
            store.setTimeLimit(formatTime(remainingTime.value));

        } else {
            callback();
        }
    }, 1000);


};

const sessionTimer = repository<ApiResponse<null>>($api);
const updateSessionTimer = async (time: number, examineeId: string, examId: number | undefined) => {
    if (!examId) return setToast('error', 'Exam has not started yet');
    try {
        await sessionTimer.updateExamSessionTimer(time, examineeId, examId);
    } catch (err: any) {
        setToast('error', err.data.message || 'An error occurred while updating session timer');
    }

};







//submit exam
const examRepo = repository<ApiResponse<null>>($api);
const performSubmit = async (submitData: SubmitExamModel) => {
    isLoading.value = true;
    try {
        const { status, message } = await examRepo.submitExam(submitData);
        if (status === 201) {
            await sessionExamRepo.deleteExamSession(submitData);
            shouldRefetch.value++;
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

    if (remainingTime.value > 0) {
        setAlert('info', 'Are you sure you want to submit your answer? Once submit your answer will be cast!', '', 'Confirm submit').then(
            async (result) => {
                if (result.isConfirmed) {
                    try {
                        await performSubmit(submitData);
                    } catch (error: any) {
                        setToast('error', error.data.message || 'An error occurred');
                    }
                }
            }
        )
    } else {
        await performSubmit(submitData);
    }


};

//findmissing

//find Missing questions
const findMissing = async () => {
    showUnanswered.value = true;
    const answeredQuestionIds = new Set(Object.keys(answers.value).map(questionId => parseInt(questionId)))
    const firstUnanswered = question.value?.data.find(item =>
        !answeredQuestionIds.has(Number(item.question_id))
    );

    if (firstUnanswered) {
        await nextTick(() => {
            const element = document.getElementById(`question-${firstUnanswered.question_id}`);
            element?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    }
};


watch(
    [
        () => sessionTime.value,
    ],
    async ([newTime], [oldTime]) => {
        if (newTime !== oldTime) {
            startTimerWithCallBack(newTime, async () => await submitExam());
        }
    },
    {
        immediate: true,
        deep: true
    }
);






onMounted(() => {
    useIntervalFn(() => {
        updateSessionTimer(remainingTime.value, inf.id, question.value?.exam_id);
    }, 5000)

})





</script>
