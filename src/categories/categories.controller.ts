import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categorie.dto';
import { AuthGuardIpAccess } from 'src/auth/auth.ip-access.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor (private categoriesService: CategoriesService) {}

  // Create Categorie
  @UseGuards(AuthGuardIpAccess)
  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() data: CategoriesDto) {
    try {
      const category = await this.categoriesService.create(data);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Find All Categories
  @UseGuards(AuthGuard)
  @Get()
  async findAll () {
    try {
      const categories = await this.categoriesService.findAll();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
