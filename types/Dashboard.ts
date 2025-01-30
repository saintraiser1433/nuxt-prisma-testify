export interface DashboardModel {
    summary: TopBarSummary
    regExaminee: ChartModel[],
    comExaminee: ChartModel[],
    coursesPassed: ChartModel[],
    examPassed: ExamPassed[]
}

interface TopBarSummary {
    registeredExaminee: number,
    completedExaminee: number,
    totalCourse: number,
    totalExams: number
}

interface ExamPassed {
    exam_id: number,
    exam_title: string,
    total_questions: number,
    total_examinees: number,
    total_correct_answers: number
}

export interface ChartModel {
    name: string,
    value: number
}


