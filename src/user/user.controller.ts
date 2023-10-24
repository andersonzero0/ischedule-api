import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCompanyDto } from './dto/company.dto';
import { CompanyEntity } from './entity/company.entity';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {} 

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('company')
  @UsePipes(new ValidationPipe())
  async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    return new CompanyEntity(await this.userService.createCompany(createCompanyDto))
  }

  @Get('company/:id')
  async findCompanyById(@Param('id') id: string): Promise<CreateCompanyDto> {
    return this.userService.findCompanyById(id)
  }
}