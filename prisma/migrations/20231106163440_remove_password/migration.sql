/*
  Warnings:

  - You are about to drop the column `password` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");
