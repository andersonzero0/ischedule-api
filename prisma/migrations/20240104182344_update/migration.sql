/*
  Warnings:

  - The primary key for the `event_time` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_event_time_id_fkey";

-- AlterTable
ALTER TABLE "event_time" DROP CONSTRAINT "event_time_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "event_time_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "event_time_id_seq";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "event_time_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_event_time_id_fkey" FOREIGN KEY ("event_time_id") REFERENCES "event_time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
