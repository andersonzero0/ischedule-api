import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto, Schedule } from './dto/company.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ClientDto } from './dto/client.dto';
import { Client, Company } from '@prisma/client';
import { PerfilCompanyDto } from './dto/perfil-company.dto';
import { LikeDto } from './dto/like.dto';

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
          categories: true,
          professionals: {
            include: {
              services: true
            }
          },
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
      const categoriesCompany = await this.prisma.categoriesOnCompany.findMany({
        where: {
          company_id: id
        }
      })

      const categoriesDelete = await Promise.all(
        categoriesCompany.filter(
          (category) => !data.categories.includes(category.category_id)
        )
      )
      
      return await this.prisma.company.update({
        data: {
          ...data,
          categories: {
            connectOrCreate: data.categories.map((category) => ({
              where: {
                company_id_category_id: {
                  category_id: category,
                  company_id: id
                }
              },
              create: {
                category_id: category
              }
            })),
            delete: categoriesDelete.map((category) => ({
              company_id_category_id: {
                category_id: category.category_id,
                company_id: id
              }
            }))
          }
        },
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

  //LIKE COMPANY
  async likeCompany(data: LikeDto) {
    try {

      const like = await this.prisma.like.findFirst({
        where: {
          client_id: data.client_id,
          company_id: data.company_id
        }
      })

      if(like) {
        return await this.prisma.like.delete({
          where: {
            id: like.id
          }
        })
      }

      return await this.prisma.like.create({
        data
      })
      
    } catch (error) {
      throw new Error(error)
    }
  }
}