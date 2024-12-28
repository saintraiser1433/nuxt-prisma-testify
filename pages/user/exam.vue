<template>
    <div>
        <div class="absolute end-5 bottom-20">
            <UButton type="button" @click="findMissing" variant="solid" color="neon-carrot" size="lg">
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
                {{ questionData }}
                <UITables :data="questionData" :columns="columns" :has-border="true" :has-column-filter="false"
                    :hasActionHeader="false" :has-pagination="false" :has-page-count="false" :td="{
                        base: 'border dark:border-gray-700 align-top',
                        padding: 'p-0'
                    }">
                    <template #question_id-data="{ row, index }">
                        <div class="font-bold p-5">
                            {{ index + 1 }}
                        </div>
                    </template>

                    <template #question-data="{ row, index: indexQuestion }">

                        <div class="w-full h-full p-5 text-wrap">
                            <p class="font-bold" v-html="row.question.value"></p>
                            <div class="grid grid-cols-2 gap-5 mt-2">
                                <URadio v-for="(method, index) of row.choices" :ui="{ base: 'cursor-pointer' }"
                                    v-model="row.selectedChoice" @click="pushData(indexQuestion, index)"
                                    :key="method.value" v-bind="method">
                                    <template #label="{ label }">
                                        <div v-html="label"></div>
                                        {{ row.selectedChoice }}
                                    </template>
                                </URadio>
                            </div>
                        </div>
                    </template>

                </UITables>

            </template>

            <template #footer>
                <UButton type="submit" color="gray" size="md" @click="submitExam" :ui="{
                    color: {
                        gray: {
                            solid: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600'
                        }
                    }
                }">Submit Exam</UButton>
            </template>
        </UICard>
        {{ highlightMissing }}
    </div>
    {{ questionData }}
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
const columns = [
    {
        key: 'question_id',
        label: '#',
        sortable: true,
        rowClass: 'w-10'
    },
    {
        key: 'question',
        label: 'Question',
        sortable: true,
    }
];



const nuxtApp = useNuxtApp();
const { info } = useAuthentication();
const { setAlert } = useAlert();
const { setToast } = useToasts();

const inf = JSON.parse(info.value);



//rendering list of questions
const shouldRefetch = ref(0);
const { data: question, status, error } = await useAPI<ExamDetails>(`/exam/available/${inf.id}`, {
    watch: [shouldRefetch],
})
const totalQuestions = computed(() => question.value?.data.length ?? 0);
const answerCount = computed(() => answerData.value.length);
const examTitle = computed(() =>
    question.value?.exam_title ? `EXAM TITLE: ${question.value.exam_title}` : 'NO EXAM AVAILABLE'
);
const questionData = computed(() => {
    const answeredIds = answerData.value.map(item => item.question_id);

    return question.value?.data.map((item) => ({
        question_id: {
            value: Number(item.question_id),
            class: answeredIds.some((x) => x === Number(item.question_id)) ? 'bg-red-500' : ''
        },
        question: {
            value: String(item.question),
            class: answeredIds.some((x) => x === Number(item.question_id)) ? 'bg-red-500' : ''
        },
        selectedChoice: null,
        choices: item.choices
    })) ?? [];
});


//selecting choices
const answerData = ref<ExamAnswerDetails[]>([])
const { isHighlightActive, scrollToFirstMissing, highlightMissing } = useExamHighlight(questionData, answerData);
const pushData = (indexQuestion: number, indexChoice: number) => {
    if (!question?.value?.data || !question.value.data[indexQuestion]) {
        setToast('error', 'Invalid question data')
        return;
    }
    const currentQuestion = question.value.data[indexQuestion];
    const currentChoice = currentQuestion.choices[indexChoice];
    if (!currentChoice) {
        setToast('error', 'Invalid choice')
        return;
    }
    const checkValue = answerData.value.findIndex(
        (item) => item.question_id === currentQuestion.question_id.value
    );
    const newEntry: ExamAnswerDetails = {
        choices_id: currentChoice.value,
        question_id: currentQuestion.question_id.value,
    };

    if (checkValue !== -1) {
        answerData.value[checkValue] = newEntry;
    } else {
        answerData.value.push(newEntry);
    }


}

//submission of exam 
const repo = repository<ApiResponse<SubmitExamModel>>(nuxtApp.$api);
const { remainingSeconds, startTimerWithCallBack } = useExamTimer()
const store = useExamStore();
const submitExam = async () => {
    if (answerData.value.length !== question.value?.data.length) {
        setToast('error', 'Please answer all questions before proceeding');
        return;
    }
    const db = {
        examinee_id: inf.id,
        exam_id: question?.value?.exam_id,
        details: answerData.value
    }
    if (remainingSeconds.value > 0) {
        setAlert('info', 'Once submitted your answer will be processed ', '', 'Submit').then(
            async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { status, message } = await repo.submitExam(db);
                        if (status === 201) {

                            answerData.value = [];
                            shouldRefetch.value++;
                        } else {
                            setToast('error', message || 'An error occurred');
                        }
                    } catch (error: any) {
                        setToast('error', error.data.message || 'An error occurred');
                    }
                }
            }
        )
    } else {
        try {
            const { status, message } = await repo.submitExam(db);
            if (status === 201) {

                answerData.value = [];
                shouldRefetch.value++;
            } else {
                setToast('error', message || 'An error occurred');
            }
        } catch (error: any) {
            setToast('error', error.data.message || 'An error occurred');
        }
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
        }
    },
    {
        immediate: true,
        deep: true
    }
);


const findMissing = () => {
    scrollToFirstMissing();
};



</script>
