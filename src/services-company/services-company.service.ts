import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceCompanyDto } from './dto/service-company.dto';

@Injectable()
export class ServicesCompanyService {
  constructor(private prisma: PrismaService) {}

  async createService(data: ServiceCompanyDto) {
    try {
      return await this.prisma.service.create({
        data
      })
      
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateService(data: ServiceCompanyDto, id: string) {
    try {
      return await this.prisma.service.update({
        where: {
          id
        },
        data
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

