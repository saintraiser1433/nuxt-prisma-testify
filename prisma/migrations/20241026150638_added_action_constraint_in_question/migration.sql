-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_exam_id_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("exam_id") ON DELETE CASCADE ON UPDATE CASCADE;
