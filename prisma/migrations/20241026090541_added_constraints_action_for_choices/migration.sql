-- DropForeignKey
ALTER TABLE "choices" DROP CONSTRAINT "choices_question_id_fkey";

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
