/*
  Warnings:

  - You are about to drop the column `studentEmail` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `studentName` on the `Attempt` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attempt" DROP COLUMN "studentEmail",
DROP COLUMN "studentName",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Test" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Teacher" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "public"."Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_uid_key" ON "public"."Student"("uid");

-- AddForeignKey
ALTER TABLE "public"."Test" ADD CONSTRAINT "Test_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attempt" ADD CONSTRAINT "Attempt_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
