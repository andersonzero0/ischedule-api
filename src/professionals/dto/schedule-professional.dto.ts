import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ScheduleProfessionalDto {
    @IsNotEmpty()
    @IsString()
    entry_times: string;

    @IsNotEmpty()
    @IsString()
    departure_time: string;

    @IsArray()
    days_week: string[];
}