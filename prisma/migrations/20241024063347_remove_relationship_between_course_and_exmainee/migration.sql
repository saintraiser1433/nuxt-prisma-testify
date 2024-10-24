/*
  Warnings:

  - You are about to drop the column `examineeId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_examineeId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "examineeId";
