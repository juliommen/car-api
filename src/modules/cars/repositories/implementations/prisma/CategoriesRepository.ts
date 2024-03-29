import { prisma } from "../../../../../utils/prismaClient";
import { Category } from "../../../entities/Category";
import {
  CategoriesRepositoryInterface,
  CreateCategoryDTO,
} from "../../CategoriesRepositoryInterface";

export class CategoriesRepository implements CategoriesRepositoryInterface {
  async createMany(categories: Category[]) {
    await prisma.category.createMany({ data: categories });
  }
  async create({ name, description }: CreateCategoryDTO) {
    await prisma.category.create({ data: new Category(name, description) });
  }

  async list() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async findByName(name: string) {
    const category = await prisma.category.findFirst({ where: { name } });
    return category;
  }
}
