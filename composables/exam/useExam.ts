export const useExam = (
    question: Ref<ExamDetails | null>,
    sessionAnswer: Ref<SessionExamineeHeader[] | null>,
    examineeId: string,
    remainingTime: Ref<number>,
    
) => {

    const { setToast } = useToasts();
    const { $api } = useNuxtApp();
    const { setAlert } = useAlert();

    const shouldRefetch = ref(0);
    const isLoading = ref(false);
    const showUnanswered = ref(false);
    const answers = ref<Record<number, number>>({});
    const examTitle = computed(() => question.value?.exam_title ? `Exam Title : ${question.value?.exam_title}` : 'Exam');
    const answerCount = computed(() => Object.keys(answers.value).length);
    const totalQuestions = computed(() => question.value?.data.length ?? 0);

    //customize question
    const questionDetails = computed(() => {
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


    //submition exam
    const examRepo = repository<ApiResponse<null>>($api);
    const sessionExamRepo = repository<ApiResponse<null>>($api);
    const performSubmit = useDebounceFn(async (submitData: SubmitExamModel) => {
        isLoading.value = true;
        try {
            const { status } = await examRepo.submitExam(submitData);
            if (status === 201) {
                answers.value = {};
                if (sessionAnswer.value) {
                    await sessionExamRepo.deleteExamSession(submitData);
                }

                showUnanswered.value = false;
                shouldRefetch.value++;
            }
        } catch (error: any) {
            setToast('error', error.data?.message || 'An error occurred');

        } finally {
            isLoading.value = false;
        }
    }, 1000, { maxWait: 5000 });


    const submitExam = async () => {
        const data = Object.entries(answers.value).map(([questionId, choicesId]) => ({
            question_id: parseInt(questionId),
            choices_id: choicesId
        }));

        const submitData: SubmitExamModel = {
            examinee_id: examineeId,
            exam_id: question.value?.exam_id,
            details: data
        };

        if (remainingTime.value > 0) {
            if (answerCount.value !== question.value?.data.length) {
                setToast('error', 'Please answer all questions before proceeding');
                return;
            } else {
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
            }

        } else {
            setToast('warning', 'Times up');
            await performSubmit(submitData);
        }


    };

    //find missing
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


    return {
        isLoading,
        findMissing,
        shouldRefetch,
        answers,
        examTitle,
        answerCount,
        totalQuestions,
        questionDetails,
        submitExam
    }

}
