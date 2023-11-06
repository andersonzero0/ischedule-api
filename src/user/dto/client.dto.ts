import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator"

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  id: string
  
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsUrl()
  avatar_url: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}