export const useExamHighlight = (questionData: Ref<ExamQuestion[]>, answerData: Ref<ExamAnswerDetails[]>) => {
    const isHighlightActive = ref(false);

    const missingQuestions = computed(() => {
        const answeredIds = new Set(answerData.value.map(item => item.question_id));
        return questionData.value.map((item, index) => ({
            index: index + 1,
            question_id: item.question_id,
            isAnswered: answeredIds.has(item.question_id.value)
        })).filter(q => !q.isAnswered);
    });

    const highlightMissing = computed(() => {
        if (!isHighlightActive.value) return '';
        return missingQuestions.value
            .map(item => `bg-red-400 dark:bg-gray-600`)
            .join(' ');
    });

    const scrollToFirstMissing = () => {
        const firstMissing = missingQuestions.value[0];
        isHighlightActive.value = false;
        isHighlightActive.value = true;
        
      
        if (firstMissing) {
            const element = document.getElementById(String(firstMissing.index));
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    }; 0

    return {
        isHighlightActive,
        scrollToFirstMissing,
        highlightMissing
    };
};