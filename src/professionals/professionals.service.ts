import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessionalsDto } from './dto/professionals.dto';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async createProfessionalsService(data: ProfessionalsDto) {
    try {
      return await this.prisma.professional.create({
        data,
        include: {
          services: true,
        }
      })
    } catch (error) {
      return error
    }
  }

  async updateProfessional(data: ProfessionalsBodyDto, id: string) {
    try {
      return await this.prisma.professional.update({
        where: {
          id
        },
        data
      })
    } catch (error) {
      return error
    }
  }

  async deleteProfessional(id: string) {
    try {
      return await this.prisma.professional.delete({
        where: {
          id
        }
      })
    } catch (error) {
      return error
    }
  }
}