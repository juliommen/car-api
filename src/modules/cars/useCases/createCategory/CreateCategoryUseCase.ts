import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

interface Request {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepositoryInterface
  ) {}

  async execute({ name, description }: Request) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!", 401);
    }
    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
