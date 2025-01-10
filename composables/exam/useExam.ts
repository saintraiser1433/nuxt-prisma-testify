import type { IndexExamAnswers } from "~/types";

export const useExam = (question: Ref<ExamDetails | null>, examineeId: string, remainingSeconds: Ref<number>) => {
  const nuxtApp = useNuxtApp();
  const { setAlert } = useAlert();
  const { setToast } = useToasts();
  const answerData = ref<ExamAnswerDetails[]>([]);
  const isHighlightActive = ref(false);
  const isLoading = ref(false);
  const shouldRefetch = ref(0);

  //computed values
  const totalQuestions = computed(() => question.value?.data.length ?? 0);
  const answerCount = computed(() => answerData.value.length);
  const examTitle = computed(() =>
    question.value?.exam_title ? `EXAM TITLE: ${question.value.exam_title}` : 'NO EXAM AVAILABLE'
  );

  //list of questions
  const questionData = computed(() => {
    const answeredIds = answerData.value.map(item => item.question_id);
    return question?.value?.data.map((item) => ({
      question_id: {
        value: Number(item.question_id),
        class: !answeredIds.some((x) => x === Number(item.question_id)) && isHighlightActive.value ? 'bg-red-400 dark:bg-red-500' : '',
      },
      question: {
        value: String(item.question),
        class: !answeredIds.some((x) => x === Number(item.question_id)) && isHighlightActive.value ? 'bg-red-400 dark:bg-red-500' : '',
      },
      choices: item.choices
    })) ?? [];
  });

  //pushing answer
  const sessionExamRepo = repository<ApiResponse<null>>(nuxtApp.$api);
  const pushData = async (res: IndexExamAnswers) => {
    const currentQuestion = questionData.value[res.indexQuestion];
    const currentChoice = currentQuestion.choices[res.indexChoice];

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

    await sessionExamRepo.addSession({
      examinee_id: examineeId,
      time_limit: remainingSeconds.value,
      exam_id: question.value?.exam_id,
      ...newEntry
    });





  }

  //toggle find my missing
  const findMissing = async () => {
    isHighlightActive.value = false;
    isHighlightActive.value = true;
    const answeredIds = answerData.value.map(item => item.question_id);
    const firstUnanswered = question.value?.data.find(item =>
      !answeredIds.some(x => x === Number(item.question_id))
    );

    if (firstUnanswered) {
      await nextTick(() => {
        const element = document.getElementById(`question-${firstUnanswered.question_id}`);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      });
    }



  };

  //submittion
  const repo = repository<ApiResponse<SubmitExamModel>>(nuxtApp.$api);
  const submitExam = async () => {
    if (answerData.value.length !== question.value?.data.length) {
      setToast('error', 'Please answer all questions before proceeding');
      return;
    }
    const res = {
      examinee_id: examineeId,
      exam_id: question?.value?.exam_id,
      details: answerData.value
    };
    if (remainingSeconds.value > 0) {
      setAlert('info', 'Once submitted your answer will be processed ', '', 'Submit').then(
        async (result) => {
          if (result.isConfirmed) {
            await performSubmit(res);
          }
        }
      );
    } else {
      await performSubmit(res);
    }
  };

  const performSubmit = async (res: SubmitExamModel) => {
    isLoading.value = true;
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
  };

  const handleTimeUp = async () => {
    setToast('warning', 'Time\'s up');
    await submitExam();
  };




  return {
    isHighlightActive,
    totalQuestions,
    answerCount,
    examTitle,
    isLoading,
    shouldRefetch,
    questionData,
    pushData,
    findMissing,
    submitExam,
    handleTimeUp,

  }



}
