import { Category } from "../../models/Category";
import {
  CategoriesRepositoryInterface,
  CreateCategoryDTO,
} from "./RepositoryInterface";

export class InMemoryCategoriesRepository
  implements CategoriesRepositoryInterface
{
  private categories: Category[];
  constructor() {
    this.categories = [];
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