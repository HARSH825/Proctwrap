/*
  Warnings:

  - You are about to drop the column `formUrl` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `protectedUrl` on the `Test` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Test" DROP COLUMN "formUrl",
DROP COLUMN "protectedUrl",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
