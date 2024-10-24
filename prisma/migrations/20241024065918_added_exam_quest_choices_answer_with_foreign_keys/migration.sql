/*
  Warnings:

  - The primary key for the `Examinee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Examinee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Examinee" DROP CONSTRAINT "Examinee_pkey",
DROP COLUMN "id",
ADD COLUMN     "examinee_id" SERIAL NOT NULL,
ADD CONSTRAINT "Examinee_pkey" PRIMARY KEY ("examinee_id");

-- CreateTable
CREATE TABLE "Exam" (
    "exam_id" SERIAL NOT NULL,
    "exam_title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "question_limit" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("exam_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Choices" (
    "choices_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Choices_pkey" PRIMARY KEY ("choices_id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "answer_id" SERIAL NOT NULL,
    "examinee_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "choices_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("answer_id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choices" ADD CONSTRAINT "Choices_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_examinee_id_fkey" FOREIGN KEY ("examinee_id") REFERENCES "Examinee"("examinee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_choices_id_fkey" FOREIGN KEY ("choices_id") REFERENCES "Choices"("choices_id") ON DELETE RESTRICT ON UPDATE CASCADE;
