import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class ServiceCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  company_id: string

  @IsNotEmpty()
  @IsUrl()
  background_img_url: string

  @IsNotEmpty()
  @IsNumber()
  price: string

  @IsNotEmpty()
  @IsString()
  estimated_time: string
}