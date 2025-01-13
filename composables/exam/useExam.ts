// export const useExam = (
//   question: Ref<ExamDetails | null>,
//   examineeId: string,
//   remainingSeconds: Ref<number>
// ) => {
//   const nuxtApp = useNuxtApp();
//   const { setAlert } = useAlert();
//   const { setToast } = useToasts();

//   // State
//   const answerData = ref<ExamAnswerDetails[]>([]);
//   const isHighlightActive = ref(false);
//   const isLoading = ref(false);
//   const shouldRefetch = ref(0);

//   // Computed values
//   const totalQuestions = computed(() => question.value?.data.length ?? 0);
//   const answerCount = computed(() => answerData.value.length);
//   const examTitle = computed(() =>
//     question.value?.exam_title
//       ? `EXAM TITLE: ${question.value.exam_title}`
//       : 'NO EXAM AVAILABLE'
//   );

//   // Process question data with highlight status
//   const questionData = computed(() => {
//     if (!question.value) return [];

//     const answeredIds = new Set(answerData.value.map(item => item.question_id));

//     return question.value.data.map((item) => {
//       const isAnswered = answeredIds.has(Number(item.question_id));
//       const highlightClass = !isAnswered && isHighlightActive.value
//         ? 'bg-red-400 dark:bg-red-500'
//         : '';

//       return {
//         question_id: {
//           value: Number(item.question_id),
//           class: highlightClass,
//         },
//         question: {
//           value: String(item.question),
//           class: highlightClass,
//         },
//         choices: item.choices
//       };
//     });
//   });

//   // API repositories
//   const sessionExamRepo = repository<ApiResponse<null>>(nuxtApp.$api);
//   const examRepo = repository<ApiResponse<SubmitExamModel>>(nuxtApp.$api);

//   // Methods
//   const pushData = async (res: IndexExamAnswers) => {
//     const currentQuestion = questionData.value[res.indexQuestion];
//     if (!currentQuestion) return;

//     const currentChoice = currentQuestion.choices[res.indexChoice];
//     if (!currentChoice) return;

//     const newEntry: ExamAnswerDetails = {
//       choices_id: currentChoice.value,
//       question_id: currentQuestion.question_id.value,
//     };

//     // Update or add new answer
//     const existingIndex = answerData.value.findIndex(
//       item => item.question_id === currentQuestion.question_id.value
//     );

//     if (existingIndex !== -1) {
//       answerData.value[existingIndex] = newEntry;
//     } else {
//       answerData.value.push(newEntry);
//     }

//     // Update session
//     await sessionExamRepo.addSession({
//       examinee_id: examineeId,
//       time_limit: remainingSeconds.value,
//       exam_id: question.value?.exam_id,
//       ...newEntry
//     });
//   };


//   //find Missing questions
//   const findMissing = async () => {
//     isHighlightActive.value = true;

//     const answeredIds = new Set(answerData.value.map(item => item.question_id));
//     const firstUnanswered = question.value?.data.find(item =>
//       !answeredIds.has(Number(item.question_id))
//     );

//     if (firstUnanswered) {
//       await nextTick(() => {
//         const element = document.getElementById(`question-${firstUnanswered.question_id}`);
//         element?.scrollIntoView({
//           behavior: 'smooth',
//           block: 'center'
//         });
//       });
//     }
//   };


//   //submit exam
//   const performSubmit = async (submitData: SubmitExamModel) => {
//     isLoading.value = true;

//     try {
//       const { status, message } = await examRepo.submitExam(submitData);

//       if (status === 201) {
//         const sessionResponse = await sessionExamRepo.deleteExamSession(submitData);
 
//         if (sessionResponse.status === 200) {
//           answerData.value = [];
//           shouldRefetch.value++;
//           return true;
//         }

//         setToast('error', sessionResponse.message || 'Failed to clear exam session');
//         return false;
//       }

//       setToast('error', message || 'Failed to submit exam');
//       return false;
//     } catch (error: any) {
//       setToast('error', error.data?.message || 'An error occurred');
//       return false;
//     } finally {
//       isLoading.value = false;
//     }
//   };

//   const submitExam = async () => {
//     if (answerData.value.length !== question.value?.data.length) {
//       setToast('error', 'Please answer all questions before proceeding');
//       return;
//     }

//     const submitData: SubmitExamModel = {
//       examinee_id: examineeId,
//       exam_id: question.value?.exam_id,
//       details: answerData.value
//     };

//     if (remainingSeconds.value > 0) {
//       const result = await setAlert(
//         'info',
//         'Once submitted your answer will be processed',
//         '',
//         'Submit'
//       );

//       if (result.isConfirmed) {
//         await performSubmit(submitData);
//       }
//     } else {
//       await performSubmit(submitData);
//     }
//   };

//   const handleTimeUp = async () => {
//     setToast('warning', 'Time\'s up');
//     await submitExam();
//   };

//   return {
//     // State
//     isHighlightActive,
//     isLoading,
//     shouldRefetch,

//     // Computed
//     totalQuestions,
//     answerCount,
//     examTitle,
//     questionData,

//     // Methods
//     pushData,
//     findMissing,
//     submitExam,
//     handleTimeUp,
//   };
// };