/*
  Warnings:

  - The primary key for the `Answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer_id` on the `Answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_pkey",
DROP COLUMN "answer_id",
ADD CONSTRAINT "Answers_pkey" PRIMARY KEY ("examinee_id", "exam_id", "question_id", "choices_id");

-- CreateTable
CREATE TABLE "ExamAttempt" (
    "examinee_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("examinee_id","exam_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" SERIAL NOT NULL,
    "department_name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Deans" (
    "deans_id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "middle_name" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "Deans_pkey" PRIMARY KEY ("deans_id")
);

-- CreateTable
CREATE TABLE "AssignDeans" (
    "deans_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssignDeans_pkey" PRIMARY KEY ("deans_id","course_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deans_department_id_key" ON "Deans"("department_id");

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_examinee_id_fkey" FOREIGN KEY ("examinee_id") REFERENCES "Examinee"("examinee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deans" ADD CONSTRAINT "Deans_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignDeans" ADD CONSTRAINT "AssignDeans_deans_id_fkey" FOREIGN KEY ("deans_id") REFERENCES "Deans"("deans_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignDeans" ADD CONSTRAINT "AssignDeans_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
