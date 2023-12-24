import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessionalsDto } from './dto/professionals.dto';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';
import { ScheduleProfessionalDto } from './dto/schedule-professional.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async createProfessionalsService(data: ProfessionalsDto) {
    try {
      return await this.prisma.professional.create({
        data,
        include: {
          services: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updateProfessional(data: ProfessionalsBodyDto, id: string) {
    try {
      return await this.prisma.professional.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async updateScheduleProfessional(data: Prisma.JsonValue, id: string) {
    try {
      const response = await this.prisma.professional.update({
        where: {
          id
        },
        data: {
          schedule: data
        }
      })

      return response
    } catch (error) {
      return error;
    }
  }

  async deleteProfessional(id: string) {
    try {
      return await this.prisma.professional.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
