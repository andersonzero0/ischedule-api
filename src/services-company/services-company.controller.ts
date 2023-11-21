import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicesCompanyService } from './services-company.service';
import { ServiceCompanyBodyDto } from './dto/service-company-body.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('services-company')
export class ServicesCompanyController {
  constructor(private serviceCompanyService: ServicesCompanyService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createService(@Body() data: ServiceCompanyBodyDto, @Request() req: any) {
    try {
      return await this.serviceCompanyService.createService({
        ...data,
        company_id: req.user.uid
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
