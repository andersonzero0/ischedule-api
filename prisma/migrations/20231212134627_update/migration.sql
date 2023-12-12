/*
  Warnings:

  - You are about to drop the `schedule_company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule_company" DROP CONSTRAINT "schedule_company_companyId_fkey";

-- DropTable
DROP TABLE "schedule_company";
