import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ScheduleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  start_time: string;
}