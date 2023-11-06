import { Module } from '@nestjs/common';
import { ServicesCompanyController } from './services-company.controller';
import { ServicesCompanyService } from './services-company.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ServicesCompanyController],
  providers: [ServicesCompanyService]
})
export class ServicesCompanyModule {}
