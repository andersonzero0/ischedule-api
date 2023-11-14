/*
  Warnings:

  - Added the required column `background_img_url` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "background_img_url" TEXT NOT NULL;
