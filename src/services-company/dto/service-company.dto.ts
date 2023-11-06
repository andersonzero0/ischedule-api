import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ServiceCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  company_id: string 

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  estimated_time: string
}