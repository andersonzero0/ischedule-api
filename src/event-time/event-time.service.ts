import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventTimeDto } from './dto/event-time.dto';

@Injectable()
export class EventTimeService {
  constructor (private prisma: PrismaService) {}

  async create(data: EventTimeDto) {
    try {

      return await this.prisma.eventTime.create({
        data
      })
      
    } catch (error) {
      throw new Error(error);
    }
  }
}
