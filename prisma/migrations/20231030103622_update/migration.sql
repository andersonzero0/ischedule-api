/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "companies_email_key";

-- DropIndex
DROP INDEX "companies_phone_key";

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");
