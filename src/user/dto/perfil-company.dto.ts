import { IsArray, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Prisma } from '@prisma/client';

export class PerfilCompanyDto {
    @IsNotEmpty()
    @IsString()
    company_name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsArray()
    schedule: Prisma.JsonValue;

    @IsNotEmpty()
    @IsUrl()
    avatar_url: string;

    @IsNotEmpty()
    @IsUrl()
    banner_url: string;
}