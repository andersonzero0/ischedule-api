/*
  Warnings:

  - You are about to drop the column `closing_time` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `opening_time` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "closing_time",
DROP COLUMN "opening_time",
ADD COLUMN     "schedule" JSONB;
