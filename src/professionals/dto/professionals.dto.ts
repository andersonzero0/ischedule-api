import { Prisma } from "@prisma/client"

export class ProfessionalsDto {
  name:string

  company_id: string

  schedule: Prisma.JsonValue

  avatar_url: string

  role: string
}