import { Body, Patch, Controller, Post, Request, UsePipes, ValidationPipe, Get, UseInterceptors, ClassSerializerInterceptor, UseGuards, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCompanyDto, Schedule } from './dto/company.dto';
import { CompanyEntity } from './entity/company.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientDto } from './dto/client.dto';
import { Client } from '@prisma/client';
import { AuthSignInGuard } from 'src/auth/auth.signin.guard';
import { PerfilCompanyDto } from './dto/perfil-company.dto';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {} 

  /* -------------------- CONTROLLERS - COMPANY --------------------------------- */
  //CREATE COMPANY
  @UseGuards(AuthSignInGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post('company')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto, @Request() req: any): Promise<CompanyEntity> {
    return new CompanyEntity(await this.userService.createCompany(createCompanyDto, req.user_uid))
  }

  //READ COMPANY
  @UseGuards(AuthGuard)
  @Get('company')
  async findCompanyById(@Request() req: any): Promise<CreateCompanyDto | boolean> {
    return this.userService.findCompanyById(req.user.uid)
  }
  
  //UPDATE COMPANY
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('company')
  async updatePerfilCompany(@Body() data: PerfilCompanyDto, @Request() req: any) {
    try {
      return await this.userService.updatePerfilCompany(data, req.user.uid)
    } catch (error) {
      return error
    }
  }


  //GET SCHEDULE
  @UseGuards(AuthGuard)
  @Get('company/schedule')
  async getSchedule(@Request() req: any) {
    try {
      return await this.userService.getSchedule(req.user.uid)
    } catch (error) {
      return error
    }
  }

  
  /* -------------------- CONTROLLERS - CLIENT --------------------------------- */
  //CREATE CLIENT
  @UsePipes(new ValidationPipe())
  @Post('client')
  async createClient(@Body() data: ClientDto): Promise<Client> {
    try {
      return await this.userService.createClient(data);
    } catch (error) {
      return error
    }
  }
}