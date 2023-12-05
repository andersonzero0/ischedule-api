-- CreateTable
CREATE TABLE "schedule_professional" (
    "id" TEXT NOT NULL,
    "entry_times" TEXT NOT NULL,
    "departure_time" TEXT NOT NULL,
    "days_week" JSONB NOT NULL,
    "professionalId" TEXT NOT NULL,

    CONSTRAINT "schedule_professional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_professional_professionalId_key" ON "schedule_professional"("professionalId");

-- AddForeignKey
ALTER TABLE "schedule_professional" ADD CONSTRAINT "schedule_professional_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
