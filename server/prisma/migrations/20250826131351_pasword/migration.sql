/*
  Warnings:

  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Teacher" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Attempt_testId_idx" ON "public"."Attempt"("testId");

-- CreateIndex
CREATE INDEX "Attempt_studentId_idx" ON "public"."Attempt"("studentId");

-- CreateIndex
CREATE INDEX "FullscreenExitEvidence_attemptId_idx" ON "public"."FullscreenExitEvidence"("attemptId");

-- CreateIndex
CREATE INDEX "MultipleFacesEvidence_attemptId_idx" ON "public"."MultipleFacesEvidence"("attemptId");

-- CreateIndex
CREATE INDEX "PhoneDetectionEvidence_attemptId_idx" ON "public"."PhoneDetectionEvidence"("attemptId");

-- CreateIndex
CREATE INDEX "TabSwitchEvidence_attemptId_idx" ON "public"."TabSwitchEvidence"("attemptId");

-- CreateIndex
CREATE INDEX "Test_teacherId_idx" ON "public"."Test"("teacherId");
