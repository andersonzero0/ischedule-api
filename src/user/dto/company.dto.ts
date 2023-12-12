import { Prisma } from '@prisma/client';
import { IsEmail, IsString, IsArray, IsNotEmpty, IsUrl, IsOptional, isNotEmpty, isString, IsBoolean } from 'class-validator'

export class CategoryDto {
  category: {
    id: Number
  }
}

export class Schedule {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsBoolean()
  checked: boolean

  @IsNotEmpty()
  @IsString()
  open_time: string

  @IsNotEmpty()
  @IsString()
  close_time: string
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
  company_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string;

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
  @IsArray()
  schedule: Prisma.JsonValue;

  @IsOptional()
  created_at: Date

  @IsOptional()
  updated_at: Date
}