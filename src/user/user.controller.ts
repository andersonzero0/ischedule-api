import { Body, Controller, Post, Request, UsePipes, ValidationPipe, Get, UseInterceptors, ClassSerializerInterceptor, UseGuards, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCompanyDto } from './dto/company.dto';
import { CompanyEntity } from './entity/company.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { NotFoundError } from 'rxjs';
import { CompanySignInDto } from './dto/company-signin.dto';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {} 

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('company')
  @UsePipes(new ValidationPipe())
  async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    return new CompanyEntity(await this.userService.createCompany(createCompanyDto))
  }

  @Post('company/signin')
  @UsePipes(new ValidationPipe())
  async signInCompany(@Body() data: CompanySignInDto) {
    try {
      const user = await this.userService.findCompanyById(data.id)

      if(user == null) {
        throw new NotFoundException()
      }

      return user
    } catch (error) {
      return error
    }
  }


  @UseGuards(AuthGuard)
  @Get('company')
  async findCompanyById(@Request() req: any): Promise<CreateCompanyDto | boolean> {
    return this.userService.findCompanyById(req.user)
  }
}