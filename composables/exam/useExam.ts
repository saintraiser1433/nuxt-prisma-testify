export const useExam = (question: Ref<ExamDetails>) => {
  const isHighlightActive = ref(false);
  const answerData = ref<ExamAnswerDetails[]>([]);


  //list of questions
  const questionData = computed(() => {
    const answeredIds = answerData.value.map(item => item.question_id);
    return question.value.data.map((item) => ({
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
  const pushData = (indexQuestion: number, indexChoice: number) => {
    const currentQuestion = questionData.value[indexQuestion];
    const currentChoice = currentQuestion.choices[indexChoice];

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


  return {
    isHighlightActive,
    questionData,
    pushData,
    answerData

  }



}
