import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/company.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private firebaseService: FirebaseService) {}

  async createCompany(data: CreateCompanyDto): Promise<CreateCompanyDto> {
    try {
      return await this.prisma.company.create({
        data
      });

    } catch (e) {
      await this.firebaseService.deleteUser(data.id)
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }

  async findCompanyById(id: string) {
    try {
      const user = await this.prisma.company.findFirst({
        where: {
          id
        }
      })

      if(!user.id) {
        return new NotFoundException()
      }

      return user
    } catch (e) {
      throw new NotFoundException()
    }
  }
}