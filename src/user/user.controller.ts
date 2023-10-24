import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCompanyDto } from './dto/company.dto';
import { returnCompany } from './dto/returnCompany.dto';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {} 

  @Post('company')
  @UsePipes(new ValidationPipe())
  async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<returnCompany> {
    const data = await this.userService.createCompany(createCompanyDto)
     return {
      name: data.name,
      email: data.email,
      created_at: data.created_at
    }
  }
}