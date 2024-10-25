/*
  Warnings:

  - You are about to drop the `Choices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_choices_id_fkey";

-- DropForeignKey
ALTER TABLE "Choices" DROP CONSTRAINT "Choices_question_id_fkey";

-- DropTable
DROP TABLE "Choices";

-- CreateTable
CREATE TABLE "choices" (
    "choices_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("choices_id")
);

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_choices_id_fkey" FOREIGN KEY ("choices_id") REFERENCES "choices"("choices_id") ON DELETE RESTRICT ON UPDATE CASCADE;
