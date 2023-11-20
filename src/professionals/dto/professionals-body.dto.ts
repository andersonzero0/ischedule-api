import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ProfessionalsBodyDto {
  @IsNotEmpty()
  @IsString()
  name:string

  @IsNotEmpty()
  @IsString()
  role: string

  @IsNotEmpty()
  @IsUrl()
  avatar_url: string
}