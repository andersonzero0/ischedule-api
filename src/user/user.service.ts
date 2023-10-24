import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/company.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createCompany(data: CreateCompanyDto): Promise<CreateCompanyDto> {
    try {
      const hash = await bcrypt.hash(data.password, process.env.SALT_OR_ROUNDS)
      
      return await this.prisma.company.create({
        data: {
          ...data,
          password: hash
        }
      });

    } catch (e) {
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }

  async findCompanyById(id: string) {
    try {
      return await this.prisma.company.findFirstOrThrow({
        where: {
          id
        }
      })
    } catch (e) {
      throw new NotFoundException()
    }
  }
}