import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
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
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!", 401);
    }
    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
