import type { NitroFetchRequest, $Fetch } from 'nitropack'
import type { Followup } from '~/types'

export const repository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
    //course



    async addCourse(body: CourseModel): Promise<T> {
        return fetch<T>('/course', {
            method: 'POST',
            body: body
        })
    },

    async updateCourse(body: CourseModel): Promise<T> {
        return fetch<T>(`/course/${body.course_id}`, {
            method: 'PUT',
            body: body
        })
    },

    async removeCourse(id: number): Promise<T> {
        return fetch<T>(`/course/${id}`, {
            method: 'DELETE',
        })
    },

    async getCourseFiltered(): Promise<CourseModel[]> {
        return fetch<CourseModel[]>(`/course/filtered`)
    },



    //end
    //deans
    async addDeans(body: DeansModel): Promise<T> {
        return fetch<T>('/deans', {
            method: 'POST',
            body: body
        })
    },

    async updateDeans(body: DeansModel): Promise<T> {
        return fetch<T>(`/deans/${body.deans_id}`, {
            method: 'PUT',
            body: body
        })
    },

    // //end

    //assign deans
    async getAssignDeans(deansId: number): Promise<AssignDeansModel[]> {
        return fetch<AssignDeansModel[]>(`/deans/assign/${deansId}`)
    },

    async addAssignCourse(data: AssignDeansModel): Promise<T> {
        return fetch<T>(`/deans/assign`, {
            method: 'POST',
            body: data
        })
    },



    async removeAssignCourse(deansId: number, courseId: number): Promise<T> {
        return fetch<T>(`/deans/assign/${deansId}/${courseId}`, {
            method: 'DELETE'
        })
    },

    //end

    //department
    async addDepartment(body: DepartmentModel): Promise<T> {
        return fetch<T>('/department', {
            method: 'POST',
            body: body
        })
    },

    async updateDepartment(body: DepartmentModel): Promise<T> {
        return fetch<T>(`/department/${body.department_id}`, {
            method: 'PUT',
            body: body
        })
    },

    async removeDepartment(id: number): Promise<T> {
        return fetch<T>(`/department/${id}`, {
            method: 'DELETE',
        })
    },

    //end

    //exam
    async getExamId(id: number): Promise<ExamModel> {
        return fetch<ExamModel>(`/exam/${id}`)
    },


    async addExam(body: ExamModel): Promise<T> {
        return fetch<T>('/exam', {
            method: 'POST',
            body: body
        })
    },

    async updateExam(body: ExamModel): Promise<T> {
        return fetch<T>(`/exam/${body.exam_id}`, {
            method: 'PUT',
            body: body
        })
    },

    async removeExam(id: number): Promise<T> {
        return fetch<T>(`/exam/${id}`, {
            method: 'DELETE',
        })
    },

    //end

    //question
    async addQuestion(body: QuestionModel): Promise<T> {
        return fetch<T>('/question', {
            method: 'POST',
            body: body
        })
    },

    async updateQuestion(body: QuestionModel): Promise<T> {
        return fetch<T>(`/question/${body.exam_id}`, {
            method: 'PUT',
            body: body
        })
    },

    async removeQuestion(id: number): Promise<T> {
        return fetch<T>(`/question/${id}`, {
            method: 'DELETE',
        })
    },

    //end

    //examinee
    async addExaminee(body: User): Promise<T> {

        return fetch<T>('/examinee', {
            method: 'POST',
            body: { ...body, role: 'examinee' }
        })
    },

    async updateExaminee(body: User): Promise<T> {
        return fetch<T>(`/examinee/${body.id}`, {
            method: 'PUT',
            body: body
        })
    },

    async removeExaminee(id: string): Promise<T> {
        return fetch<T>(`/examinee/${id}`, {
            method: 'DELETE',
        })
    },

    async uploadImage(file: any) {
        return fetch<T>(`/file`, {
            method: 'POST',
            body: file
        })
    },


    async addFollowup(body: Followup): Promise<T> {

        return fetch<T>('/examinee/followup', {
            method: 'POST',
            body: body
        })
    },




    //end



})