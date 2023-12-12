-- CreateTable
CREATE TABLE "schedule_company" (
    "id" TEXT NOT NULL,
    "data" JSONB[],
    "companyId" TEXT NOT NULL,

    CONSTRAINT "schedule_company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_company_companyId_key" ON "schedule_company"("companyId");

-- AddForeignKey
ALTER TABLE "schedule_company" ADD CONSTRAINT "schedule_company_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
