import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';
import { ScheduleProfessionalDto } from './dto/schedule-professional.dto';
import { Prisma } from '@prisma/client';
import { scheduled } from 'rxjs';
import { ScheduleDto } from 'src/globals-dto/schedule.dto';
import { ProfessionalsEntity } from './entity/professionals.entity';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private professionalService: ProfessionalsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createProfessional(
    @Body() data: ProfessionalsBodyDto,
    @Request() req: any,
  ) {
    try {
      return await this.professionalService.createProfessionalsService({
        ...data,
        company_id: req.user.uid,
      });
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Get('service/:service_id')
  async getProfessionalsByService(
    @Param('service_id') service_id: string,
    @Query() scheduled: ScheduleDto,
  ): Promise<ProfessionalsEntity[]> {
    try {
      return (
        await this.professionalService.getProfessionalsByServiceAndSchedule(
          service_id,
          scheduled,
        )
      ).map((professional) => {
        return new ProfessionalsEntity(professional);
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateProfessional(
    @Body() data: ProfessionalsBodyDto,
    @Param('id') id: string,
  ) {
    try {
      return await this.professionalService.updateProfessional(data, id);
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('schedule/:id')
  async updateScheduleProfessional(
    @Body() data: Prisma.JsonValue,
    @Param('id') id: string,
  ) {
    try {
      return await this.professionalService.updateScheduleProfessional(
        data,
        id,
      );
    } catch (error) {
      return error;
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async deleteProfessional(@Param('id') id: string) {
    try {
      return await this.professionalService.deleteProfessional(id);
    } catch (error) {
      return error;
    }
  }
}
