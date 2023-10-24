import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/company.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createCompany(data: CreateCompanyDto): Promise<CreateCompanyDto> {
    try {
      const response = await this.prisma.company.create({
        data,
      });

      return response

    } catch (e) {
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }
}
