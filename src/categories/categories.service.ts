import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesDto } from './dto/categorie.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoriesDto[]) {
    try {
      const category = await this.prisma.category.createMany({
        data
      });
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new Error(error);
    }
  }
}
