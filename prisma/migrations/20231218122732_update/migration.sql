/*
  Warnings:

  - You are about to drop the `schedule_professional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule_professional" DROP CONSTRAINT "schedule_professional_professionalId_fkey";

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "schedule" JSONB;

-- DropTable
DROP TABLE "schedule_professional";
