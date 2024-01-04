import { Module } from '@nestjs/common';
import { EventTimeService } from './event-time.service';
import { EventTimeController } from './event-time.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EventTimeService],
  controllers: [EventTimeController]
})
export class EventTimeModule {}
