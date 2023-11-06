import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ServiceCompanyBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  estimated_time: string
}