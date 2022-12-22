import { inject, injectable } from "tsyringe";

import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepositoryInterface
  ) {}
  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
