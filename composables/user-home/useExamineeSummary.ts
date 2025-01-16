export const useExamineeSummary = (data?: SummaryResult, dataCourse?: CourseModel[]) => {
    const summaryData = computed(() => data);

    const summaryScores = computed(() => {
        if (!summaryData.value) return { totalCorrect: 0, totalQuestions: 0 };

        const totalCorrect = summaryData.value.examDetails.reduce((a, b) => a + b.total_correct_answers, 0);
        const totalQuestions = summaryData.value.examDetails.reduce((a, b) => a + b.total_questions, 0);
        return {
            totalCorrect,
            totalQuestions
        }
    })

    const examineeName = computed(() => {
        const middleNameInitial = summaryData.value?.middle_name ? summaryData.value.middle_name[0] : '';
        return `${summaryData.value?.last_name}, ${summaryData.value?.first_name} ${middleNameInitial}.`;
    });


    const courseData = computed(() => {
        if (!dataCourse || !summaryData.value) return [];
        return dataCourse.filter((item) => item.score <= (summaryScores.value.totalCorrect));
    });

    const isFinished = computed(() => {
        const examCnt = summaryData.value?.examCnt ?? 0;
        const examAttempt = summaryData.value?.examAttempt ?? 0;
        return examCnt === examAttempt;
    });


    const examAttempts = computed(() => {
        const examAttempt = summaryData.value?.examAttempt ?? 0;
        const examCnt = summaryData.value?.examCnt ?? 0;
        return `Exam Finished ${examAttempt} out of ${examCnt}`;
    });


    return {
        summaryData,
        courseData,
        summaryScores,
        examineeName,
        isFinished,
        examAttempts
    }
}