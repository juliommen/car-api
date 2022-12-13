import { Category } from "../../models/Category";

export interface CreateCategoryDTO {
  name: string;
  description: string;
}

export interface CategoriesRepositoryInterface {
  create({ name, description }: CreateCategoryDTO): void;
  findByName(name: string): Category;
  list(): Category[];
}
