import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessionalsDto } from './dto/professionals.dto';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';
import { ScheduleProfessionalDto } from './dto/schedule-professional.dto';

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

  async findScheduleProfessional(id: string) {
    try {
      return await this.prisma.scheduleProfessional.findFirst({
        where: {
          professionalId: id
        }
      })
    } catch (error) {
      return error
    }
  }

  async updateScheduleProfessional(data: ScheduleProfessionalDto, id: string) {
    try {
      const scheduleProfessional = await this.findScheduleProfessional(id)

      if(!scheduleProfessional) {
        return await this.prisma.scheduleProfessional.create({
          data: {
            ...data,
            professionalId: id
          }
        })
      }

      return await this.prisma.scheduleProfessional.update({
        data,
        where: {
          professionalId: id
        }
      })
    } catch (error) {
      return error
    }
  }
}
