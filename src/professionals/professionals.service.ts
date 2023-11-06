import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessionalsDto } from './dto/professionals.dto';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async createProfessionalsService(data: ProfessionalsDto, services: Number[]) {
    try {
      return await this.prisma.professional.create({
        data: {
          ...data,
          services: {
            create: services.map((serviceId: number) => ({
              service: {
                connect: {
                  id: serviceId
                }
              }
            }))
          }
        },
        include: {
          services: true,
        }
      })
    } catch (error) {
      return error
    }
  }
}
