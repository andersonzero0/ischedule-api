import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor (private professionalService: ProfessionalsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createProfessional(@Body() data: ProfessionalsBodyDto, @Request() req: any) {
    try {
      return await this.professionalService.createProfessionalsService({
        name: data.name,
        role: data.role,
        company_id: req.user.uid
      }, data.services)
    } catch (error) {
      return error
    }
  }
}
