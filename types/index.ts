// Base Timestamp Interface

interface Timestamped {
    createdAt?: Date;
    updatedAt?: Date;
}



// Examinee Model


// Course Model
export interface CourseModel extends Timestamped {
    course_id?: number;
    description: string;
    score: number;
    AssignDeans?: AssignDeansModel[]; // Optional relationship
}

// Exam Model
export interface ExamModel extends Timestamped {
    exam_id?: number;
    exam_title?: string;
    description?: string;
    time_limit?: number;
    status?: boolean;
    Question?: QuestionModel[]; // Optional relationship
    Answers?: AnswersModel[]; // Optional relationship
    ExamAttempt?: ExamAttemptModel[]; // Optional relationship
}

// Question Model
export interface QuestionModel extends Timestamped {
    question_id?: number;
    question?: string;
    exam_id?: number;
    Exam?: ExamModel[]; // Optional relationship
    Choices?: ChoicesModel[]; // Optional relationship
    Answers?: AnswersModel[]; // Optional relationship
}

// Choices Model
export interface ChoicesModel extends Timestamped {
    choices_id?: number;
    question_id?: number;
    questionList?: QuestionModel; // Optional relationship
    description?: string;
    status?: boolean;
    Answers?: AnswersModel[]; // Optional relationship
}

// Answers Model
export interface AnswersModel extends Timestamped {
    examinee_id: number;
    exam_id: number;
    question_id: number;
    choices_id: number;
    examineeList?: User; // Optional relationship
    examList?: ExamModel; // Optional relationship
    questionList?: QuestionModel; // Optional relationship
    choicesList?: ChoicesModel; // Optional relationship
}

// ExamAttempt Model
export interface ExamAttemptModel extends Timestamped {
    examinee_id: number;
    exam_id: number;
    examineeList?: User; // Optional relationship
    examList?: ExamModel; // Optional relationship
}

// Department Model
export interface DepartmentModel extends Timestamped {
    department_id?: number;
    department_name?: string;
    status?: boolean;
    Deans?: DeansModel; // Optional relationship
}

// Deans Model
export interface DeansModel extends Timestamped {
    deans_id?: number;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    fullname?: string;
    username?: string;
    password?: string;
    status?: boolean
    department_id?: number; // Unique
    department?: DepartmentModel; // Optional relationship
    AssignDeans?: AssignDeansModel[]; // Optional relationship
}

// AssignDeans Model
export interface AssignDeansModel extends Timestamped {
    deans_id?: number;
    course_id?: number;
    deans?: DeansModel; // Optional relationship
    course?: CourseModel; // Optional relationship
}


export interface DeansInfoData {
    deans: DeansModel[];
    department: DepartmentModel[];
}

export interface AssignDeansInfoData {
    assignCourses: AssignDeansModel[];
    filteredCourses: CourseModel[];
}

export interface Token {
    token: TokenDetail,
    user: User

}

export interface FollowupModel {
    gender?: string,
    birth_date?: string,
    contact_number?: string,
    school?: string,
    address?: string
    email?: string
}



export interface TokenDetail {
    accessToken: string;
    refreshToken: string;
}

export interface refreshTokenModel {
    accessToken: string
}

export interface DepartmentSelection {
    name: string | undefined,
    value: number | undefined

}

export interface User {
    id?: string,
    email?: string,
    username?: string,
    first_name?: string,
    last_name?: string,
    middle_name?: string,
    password?: string,
    accessToken?: string,
    refreshToken?: string,
    role?: Role
}

export interface Followup {
    examineeId?: string,
    gender?: string,
    birth_date?: string,
    contact_number?: string,
    school?: string,
    email?: string,
    address?: string
}



export type Role = 'admin' | 'examinee' | 'deans';

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}






export interface TokenStatus {
    user?: any;
    message?: string
    status: string
}

export interface ApiResponse<T> {
    message: string,
    data?: T,
}


export interface CardProps {
    padding?: string,
    base?: string

}
export interface CardDefaultProps {
    base?: string,
    divide?: string
}

export interface TableProps {
    padding?: string,
    base?: string
}



export interface SubmitExamModel {
    examinee_id: string,
    exam_id?: number,
    details: {
        question_id: number,
        choices_id: number
    }[]

}

export interface ExamChoice {
    value: number;
    label: string;
}
export interface ExamQuestion {
    question_id: number;
    question: string;
    selectedChoice?: number | null;
    choices: ExamChoice[];
}

export interface ExamDetails {
    exam_id: number;
    time_limit: number;
    exam_title: string;
    data: ExamQuestion[];
}

export interface ExamAnswerDetails {
    question_id: number,
    choices_id: number
}

export interface GetScore {
    correct: number,
    questions: number,
    examCnt: number,
    examAttempt: number
}

export interface GetSummary {
    exam_id: number,
    exam_title: string,
    percentage: number,
    total_correct_answer: number,
    total_questions: number,
    success_rate: number
}





import { format, parse, parseISO, getDay } from 'date-fns';
declare module '#app' {
    interface NuxtApp {
        $datefns: {
            format: typeof format;
            parse: typeof parse;
            parseISO: typeof parseISO;
            getDay: typeof getDay;
        };
    }
}


