/*
  Warnings:

  - The primary key for the `Examinee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `examinee` on the `Examinee` table. All the data in the column will be lost.
  - Added the required column `examineeId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "examineeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Examinee" DROP CONSTRAINT "Examinee_pkey",
DROP COLUMN "examinee",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Examinee_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_examineeId_fkey" FOREIGN KEY ("examineeId") REFERENCES "Examinee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
