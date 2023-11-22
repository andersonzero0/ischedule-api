import { Body, Controller, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicesCompanyService } from './services-company.service';
import { ServiceCompanyBodyDto } from './dto/service-company-body.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ServiceCompanyDto } from './dto/service-company.dto';

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

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateService(@Body() data: ServiceCompanyDto, @Param('id') id: string) {
    try {
      return await this.serviceCompanyService.updateService(data, id)
    } catch (error) {
      throw new Error(error)
    }
  }
}
