export interface DashboardModel {
    summary: TopBarSummary
    regExaminee: ChartModel,
    comExaminee: ChartModel
}

interface TopBarSummary {
    registeredExaminee: number,
    completedExaminee: number,
    totalCourse: number,
    totalExams: number
}

interface ChartModel {
    keydate: string,
    count: number
}
