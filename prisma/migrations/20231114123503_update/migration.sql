/*
  Warnings:

  - Added the required column `avatar_url` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "avatar_url" TEXT NOT NULL;
