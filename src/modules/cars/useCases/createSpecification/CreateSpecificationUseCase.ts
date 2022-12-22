import { inject, injectable } from "tsyringe";

import { SpecificationsRepositoryInterface } from "../../repositories/SpecificationsRepositoryInterface";

interface Request {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepositoryInterface
  ) {}

  async execute({ name, description }: Request) {
    const categoryAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }
    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
