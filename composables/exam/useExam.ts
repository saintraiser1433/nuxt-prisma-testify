import type { IndexExamAnswers } from "~/types";

export const useExam = (question: Ref<ExamDetails | null>) => {
  const isHighlightActive = ref(false);
  const answerData = ref<ExamAnswerDetails[]>([]);
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

  const pushData = (res: IndexExamAnswers) => {
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


  return {
    isHighlightActive,
    questionData,
    pushData,
    answerData,
    totalQuestions,
    answerCount,
    examTitle,
    findMissing

  }



}
