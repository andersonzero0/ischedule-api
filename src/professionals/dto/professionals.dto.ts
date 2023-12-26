import { Prisma } from "@prisma/client"

export class ProfessionalsDto {
  name:string

  company_id: string

  schedule: Prisma.JsonValue

  services: string[]

  avatar_url: string

  role: string
}