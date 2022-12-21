import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}
  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
