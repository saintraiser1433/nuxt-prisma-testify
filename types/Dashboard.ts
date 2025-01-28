export interface DashboardModel extends CoursePassed {
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

interface CoursePassed {
    course_name:string,
    totalPassed:number
}

export interface ChartModel {
    keydate: string,
    count: number
}
