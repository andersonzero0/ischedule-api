import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PerfilCompanyDto {
    @IsNotEmpty()
    @IsString()
    company_name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsUrl()
    avatar_url: string;

    @IsNotEmpty()
    @IsUrl()
    banner_url: string;
}