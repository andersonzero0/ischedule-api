/*
  Warnings:

  - The primary key for the `professionals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `services_professional` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "event_time" DROP CONSTRAINT "event_time_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "event_time" DROP CONSTRAINT "event_time_service_id_fkey";

-- DropForeignKey
ALTER TABLE "services_professional" DROP CONSTRAINT "services_professional_professional_id_fkey";

-- DropForeignKey
ALTER TABLE "services_professional" DROP CONSTRAINT "services_professional_service_id_fkey";

-- AlterTable
ALTER TABLE "event_time" ALTER COLUMN "professional_id" SET DATA TYPE TEXT,
ALTER COLUMN "service_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "professionals_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "professionals_id_seq";

-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "services_id_seq";

-- AlterTable
ALTER TABLE "services_professional" DROP CONSTRAINT "services_professional_pkey",
ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ALTER COLUMN "professional_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "services_professional_pkey" PRIMARY KEY ("service_id", "professional_id");

-- AddForeignKey
ALTER TABLE "services_professional" ADD CONSTRAINT "services_professional_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_professional" ADD CONSTRAINT "services_professional_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_time" ADD CONSTRAINT "event_time_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_time" ADD CONSTRAINT "event_time_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
