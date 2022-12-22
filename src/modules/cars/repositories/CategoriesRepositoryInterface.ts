import { Category } from "../entities/Category";

export interface CreateCategoryDTO {
  name: string;
  description: string;
}

export interface CategoriesRepositoryInterface {
  create({ name, description }: CreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  createMany(categories: Category[]): Promise<void>;
}
