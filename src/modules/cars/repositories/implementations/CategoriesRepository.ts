import { Category } from "../../models/Category";
import {
  CategoriesRepositoryInterface,
  CreateCategoryDTO,
} from "../CategoriesRepositoryInterface";

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

  create({ name, description }: CreateCategoryDTO) {
    const category = new Category();
    Object.assign(category, { name, description, created_at: new Date() });
    this.categories.push(category);
  }

  list() {
    return this.categories;
  }

  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
