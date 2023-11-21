import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceCompanyDto } from './dto/service-company.dto';

@Injectable()
export class ServicesCompanyService {
  constructor(private prisma: PrismaService) {}

  async createService(data: ServiceCompanyDto) {
    try {
      const response = await this.prisma.service.create({
        data
      })
      console.log(response)
      
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}

