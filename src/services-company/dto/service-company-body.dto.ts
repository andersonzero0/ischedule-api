import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class ServiceCompanyBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsUrl()
  background_img_url: string

  @IsNotEmpty()
  @IsString()
  estimated_time: string
}