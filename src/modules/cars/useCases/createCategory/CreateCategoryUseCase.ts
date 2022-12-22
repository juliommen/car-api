import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

interface Request {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  async execute({ name, description }: Request) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }
    await this.categoriesRepository.create({ name, description });
  }
}
