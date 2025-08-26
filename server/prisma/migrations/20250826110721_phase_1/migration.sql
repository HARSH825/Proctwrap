/*
  Warnings:

  - You are about to drop the column `violations` on the `Attempt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Attempt" DROP COLUMN "violations",
ADD COLUMN     "fullscreenExitCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "multipleFacesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phoneDetectionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tabSwitchCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."TabSwitchEvidence" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptId" TEXT NOT NULL,

    CONSTRAINT "TabSwitchEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FullscreenExitEvidence" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptId" TEXT NOT NULL,

    CONSTRAINT "FullscreenExitEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MultipleFacesEvidence" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptId" TEXT NOT NULL,

    CONSTRAINT "MultipleFacesEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PhoneDetectionEvidence" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptId" TEXT NOT NULL,

    CONSTRAINT "PhoneDetectionEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_slug_key" ON "public"."Test"("slug");

-- AddForeignKey
ALTER TABLE "public"."TabSwitchEvidence" ADD CONSTRAINT "TabSwitchEvidence_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FullscreenExitEvidence" ADD CONSTRAINT "FullscreenExitEvidence_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MultipleFacesEvidence" ADD CONSTRAINT "MultipleFacesEvidence_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PhoneDetectionEvidence" ADD CONSTRAINT "PhoneDetectionEvidence_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
