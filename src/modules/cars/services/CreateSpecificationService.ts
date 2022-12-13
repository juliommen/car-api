import { SpecificationRepositoryInterface } from "../repositories/Specification/RepositoryInterface";

interface Request {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(
    private specificationRepository: SpecificationRepositoryInterface
  ) {}

  execute({ name, description }: Request) {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }
    this.specificationRepository.create({ name, description });
  }
}
