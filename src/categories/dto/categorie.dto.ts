import { IsNotEmpty, IsString } from "class-validator";

export class CategoriesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}