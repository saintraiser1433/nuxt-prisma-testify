-- CreateTable
CREATE TABLE "Course" (
    "course_id" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "score" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);
