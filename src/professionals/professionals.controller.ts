import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';
import { ScheduleProfessionalDto } from './dto/schedule-professional.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor (private professionalService: ProfessionalsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createProfessional(@Body() data: ProfessionalsBodyDto, @Request() req: any) {
    try {
      return await this.professionalService.createProfessionalsService({
        ...data,
        company_id: req.user.uid
      })
    } catch (error) {
      return error
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async updateProfessional(@Body() data: ProfessionalsBodyDto, @Param('id') id: string) {
    try {
      return await this.professionalService.updateProfessional(data, id)
    } catch (error) {
      return error
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async deleteProfessional(@Param('id') id: string) {
    try {
      return await this.professionalService.deleteProfessional(id)
    } catch (error) {
      return error
    }
  }
}
