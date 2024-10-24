// Base Timestamp Interface
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

// Examinee Model
export interface Examinee extends Timestamped {
  examinee_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  password: string;
  Answers?: Answers[]; // Optional relationship
  ExamAttempt?: ExamAttempt[]; // Optional relationship
}

// Course Model
export interface Course extends Timestamped {
  course_id: number;
  description: string;
  score: string;
  AssignDeans?: AssignDeans[]; // Optional relationship
}

// Exam Model
export interface Exam extends Timestamped {
  exam_id: number;
  exam_title: string;
  description: string;
  time_limit: number;
  question_limit: number;
  status: boolean;
  Question?: Question[]; // Optional relationship
  Answers?: Answers[]; // Optional relationship
  ExamAttempt?: ExamAttempt[]; // Optional relationship
}

// Question Model
export interface Question extends Timestamped {
  question_id: number;
  exam_id: number;
  examList?: Exam; // Optional relationship
  Choices?: Choices[]; // Optional relationship
  Answers?: Answers[]; // Optional relationship
}

// Choices Model
export interface Choices extends Timestamped {
  choices_id: number;
  question_id: number;
  questionList?: Question; // Optional relationship
  description: string;
  status: boolean;
  Answers?: Answers[]; // Optional relationship
}

// Answers Model
export interface Answers extends Timestamped {
  examinee_id: number;
  exam_id: number;
  question_id: number;
  choices_id: number;
  examineeList?: Examinee; // Optional relationship
  examList?: Exam; // Optional relationship
  questionList?: Question; // Optional relationship
  choicesList?: Choices; // Optional relationship
}

// ExamAttempt Model
export interface ExamAttempt extends Timestamped {
  examinee_id: number;
  exam_id: number;
  examineeList?: Examinee; // Optional relationship
  examList?: Exam; // Optional relationship
}

// Department Model
export interface Department extends Timestamped {
  department_id: number;
  department_name: string;
  status: boolean;
  Deans?: Deans; // Optional relationship
}

// Deans Model
export interface Deans extends Timestamped {
  deans_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  password: string;
  department_id: number; // Unique
  department?: Department; // Optional relationship
  AssignDeans?: AssignDeans[]; // Optional relationship
}

// AssignDeans Model
export interface AssignDeans extends Timestamped {
  deans_id: number;
  course_id: number;
  deans?: Deans; // Optional relationship
  course?: Course; // Optional relationship
}
