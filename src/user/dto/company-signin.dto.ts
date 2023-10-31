import { IsNotEmpty, IsString } from "class-validator";

export class CompanySignInDto {
  @IsNotEmpty()
  @IsString()
  id: string
}