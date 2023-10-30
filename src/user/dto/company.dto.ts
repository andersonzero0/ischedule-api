import { Prisma } from '@prisma/client';
import { IsEmail, IsString, IsArray, IsNotEmpty, IsUrl, IsOptional } from 'class-validator'

export class CategoryDto {
  category: {
    id: Number
  }
}

export class CreateCompanyDto{
  @IsNotEmpty()
  @IsString()
  id: string
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  avatar_url: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  banner_url: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsOptional()
  @IsOptional()
  @IsArray()
  social: Prisma.JsonValue;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  opening_time: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  closing_time: string;

  @IsOptional()
  created_at: Date

  @IsOptional()
  updated_at: Date
}