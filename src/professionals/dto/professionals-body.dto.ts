import { Prisma } from "@prisma/client"
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"

export class ProfessionalsBodyDto {
  @IsNotEmpty()
  @IsString()
  name:string

  @IsNotEmpty()
  @IsString()
  role: string

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  schedule: Prisma.JsonValue

  @IsOptional()
  @IsArray()
  services: string[]

  @IsNotEmpty()
  @IsUrl()
  avatar_url: string
}