import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto, Schedule } from './dto/company.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ClientDto } from './dto/client.dto';
import { Client, Company } from '@prisma/client';
import { PerfilCompanyDto } from './dto/perfil-company.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private firebaseService: FirebaseService) {}

  /* ------------ SERVICES - COMPANY ------------------- */
  //CREATE COMPANY
  async createCompany(data: CreateCompanyDto, uid: string): Promise<CreateCompanyDto> {
    try {
      const user = await this.firebaseService.getUser(uid)

      if(!user) {
        throw new UnauthorizedException()
      }
      
      return await this.prisma.company.create({
        data
      });

    } catch (e) {
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }

  //READ COMPANY
  async findCompanyById(id: string): Promise<Company> {
    try {
      const user = await this.prisma.company.findFirst({
        where: {
          id
        },
        include: {
          service: true,
          professionals: true,
          _count: {
            select: {
              likes: true,
            }
          }
        }
      })

      return user
    } catch (e) {
      throw new NotFoundException()
    }
  }

  //UPDATE COMPANY
  async updatePerfilCompany(data: PerfilCompanyDto, id: string) {
    try {
      return await this.prisma.company.update({
        data,
        where: {
          id
        }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  //SET SCHEDULE
  async setSchedule(schedule: Schedule[], id: string) {
    try {
      const scheduleData = JSON.stringify(schedule);
      return await this.prisma.company.update({
        data: {
          schedule: scheduleData,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  //GET SCHEDULE
  async getSchedule(id: string) {
    try {
      return await this.prisma.company.findFirst({
        where: {
          id,
        },
        select: {
          schedule: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  
  /* ------------ SERVICES - CLIENT ------------------- */
  //CREATE CLIENT
  async createClient(data: ClientDto): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data
      })

    } catch (e) {
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }

}