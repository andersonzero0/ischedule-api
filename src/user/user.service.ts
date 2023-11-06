import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/company.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ClientDto } from './dto/client.dto';
import { Client, Company } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private firebaseService: FirebaseService) {}

  async createCompany(data: CreateCompanyDto, uid: string): Promise<CreateCompanyDto> {
    try {
      const user = await this.firebaseService.getUser(uid)

      if(!user) {
        throw new UnauthorizedException()
      }
      
      return await this.prisma.company.create({
        data
      });

    } catch (e) {
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }

  async createClient(data: ClientDto): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data
      })

    } catch (e) {
      if (e.code == 'P2002') {
        throw new ConflictException()
      }
      throw e
    }
  }

  async findCompanyById(id: string): Promise<Company> {
    try {
      const user = await this.prisma.company.findFirst({
        where: {
          id
        },
        include: {
          service: true,
          professionals: true
        }
      })

      return user
    } catch (e) {
      throw new NotFoundException()
    }
  }
}