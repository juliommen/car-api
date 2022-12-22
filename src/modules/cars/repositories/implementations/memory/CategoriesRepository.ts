import { Category } from "../../../entities/Category";
import {
  CategoriesRepositoryInterface,
  CreateCategoryDTO,
} from "../../CategoriesRepositoryInterface";

export class CategoriesRepository implements CategoriesRepositoryInterface {
  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  private static INSTANCE;

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  async create({ name, description }: CreateCategoryDTO) {
    const category = new Category(name, description);
    this.categories.push(category);
  }

  async list() {
    return this.categories;
  }

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async createMany(categories: Category[]): Promise<void> {
    categories.forEach(async (cat) => {
      const alreadyExists = await this.findByName(cat.name);
      if (!alreadyExists) {
        this.categories.push(cat);
      }
    });
  }
}
