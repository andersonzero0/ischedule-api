import { IsNotEmpty, IsString } from "class-validator"

export class LikeDto {
  @IsNotEmpty()
  @IsString()
  client_id: string

  @IsNotEmpty()
  @IsString()
  company_id: string
}