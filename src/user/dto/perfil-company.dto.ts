import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Prisma } from '@prisma/client';

export class PerfilCompanyDto {

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
    @IsArray()
    schedule: Prisma.JsonValue;

    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    avatar_url: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    banner_url: string;
}