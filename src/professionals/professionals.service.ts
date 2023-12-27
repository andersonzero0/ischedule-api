import {
  Injectable,
  NotAcceptableException,
  NotImplementedException,
} from '@nestjs/common';
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
        data: {
          ...data,
          services: {
            create: data.services.map((service) => ({ service_id: service })),
          },
        },
        include: {
          services: true,
        },
      });
    } catch (error) {
      throw new NotImplementedException();
    }
  }

  async updateProfessional(data: ProfessionalsBodyDto, id: string) {
    try {
      const servicesProfessional =
        await this.prisma.serviceOnProfessional.findMany({
          where: {
            professional_id: id,
          },
        });

      const servicesDelete = await Promise.all(
        servicesProfessional.filter(
          (service) => !data.services.includes(service.service_id),
        ),
      );

      return await this.prisma.professional.update({
        where: {
          id,
        },
        data: {
          ...data,
          services: {
            connectOrCreate: data.services.map((service) => ({
              where: {
                service_id_professional_id: {
                  service_id: service,
                  professional_id: id,
                },
              },
              create: { service_id: service },
            })),
            delete: servicesDelete.map((service) => ({
              service_id_professional_id: {
                service_id: service.service_id,
                professional_id: id,
              },
            })),
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException();
    }
  }

  async updateScheduleProfessional(data: Prisma.JsonValue, id: string) {
    try {
      const response = await this.prisma.professional.update({
        where: {
          id,
        },
        data: {
          schedule: data,
        },
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProfessional(id: string) {
    try {
      await this.prisma.serviceOnProfessional.deleteMany({
        where: {
          professional_id: id,
        },
      });

      return await this.prisma.professional.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new NotImplementedException();
    }
  }
}
