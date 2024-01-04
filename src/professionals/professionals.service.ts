import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessionalsDto } from './dto/professionals.dto';
import { ProfessionalsBodyDto } from './dto/professionals-body.dto';
import { Prisma } from '@prisma/client';
import { ScheduleDto } from 'src/globals-dto/schedule.dto';

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

  async getProfessionalsByServiceAndSchedule(
    service_id: string,
    schedule: ScheduleDto,
  ) {
    try {
      const professionals = await this.prisma.professional.findMany({
        where: {
          services: {
            some: {
              service_id,
            },
          },
        },
      });

      const service = await this.prisma.service.findUnique({
        where: {
          id: service_id,
        },
      });

      const professionalsFilter = professionals.filter((professional) => {
        const scheduleProfessional = (professional.schedule as any[]).find(
          (scheduleProfessional: { name: string; checked: boolean }) => {
            return (
              scheduleProfessional.name === schedule.name &&
              scheduleProfessional.checked
            );
          },
        );

        if (!scheduleProfessional) {
          throw new NotFoundException();
        }

        const [estimatedHours, estimatedMinutes] = service.estimated_time
          .split(':')
          .map(Number);
        const estimatedTimeInMilliseconds =
          estimatedHours * 60 * 60 * 1000 + estimatedMinutes * 60 * 1000;

        const startTime = new Date(schedule.start_time).getTime();
        const estimetedTime = new Date(
          startTime + estimatedTimeInMilliseconds,
        ).getTime();
        const opening_time = new Date(
          scheduleProfessional.opening_time,
        ).getTime();
        const closing_time = new Date(
          scheduleProfessional.closing_time,
        ).getTime();

        return (
          startTime >= opening_time &&
          estimetedTime <= closing_time &&
          startTime <= closing_time &&
          estimetedTime >= opening_time
        );
      });

      if (professionalsFilter.length === 0) {
        throw new NotFoundException();
      }

      return professionalsFilter;
    } catch (error) {
      throw new NotFoundException();
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
