import { Body, Controller, Post, Request, UsePipes, ValidationPipe, Get, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCompanyDto } from './dto/company.dto';
import { CompanyEntity } from './entity/company.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotFoundError } from 'rxjs';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {} 

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('company')
  @UsePipes(new ValidationPipe())
  async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    return new CompanyEntity(await this.userService.createCompany(createCompanyDto))
  }

  @UseGuards(AuthGuard)
  @Get('company')
  async findCompanyById(@Request() req: any): Promise<CreateCompanyDto | NotFoundError> {
    return this.userService.findCompanyById(req.user)
  }
}