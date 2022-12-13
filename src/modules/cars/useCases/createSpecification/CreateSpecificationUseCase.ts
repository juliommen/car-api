import { SpecificationsRepositoryInterface } from "../../repositories/SpecificationsRepositoryInterface";

interface Request {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(
    private specificationsRepository: SpecificationsRepositoryInterface
  ) {}

  execute({ name, description }: Request) {
    const categoryAlreadyExists =
      this.specificationsRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }
    this.specificationsRepository.create({ name, description });
  }
}
