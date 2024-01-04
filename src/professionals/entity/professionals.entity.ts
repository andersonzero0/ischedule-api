import { Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";

export class ProfessionalsEntity {

  @Exclude()
  company_id: string
  schedule: Prisma.JsonValue
  services: string[]

  constructor(partial: Partial<ProfessionalsEntity>) {
    Object.assign(this, partial);
  }
}