import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

interface Request {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  execute({ name, description }: Request) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }
    this.categoriesRepository.create({ name, description });
  }
}
