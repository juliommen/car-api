import { Specification } from "../../../entities/Specification";
import {
  SpecificationsRepositoryInterface,
  CreateSpecificationDTO,
} from "../../SpecificationsRepositoryInterface";

export class SpecificationsRepository
  implements SpecificationsRepositoryInterface
{
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
  }

  private static INSTANCE;

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  async create({ name, description }: CreateSpecificationDTO) {
    const specification = new Specification(name, description);
    this.specifications.push(specification);
  }

  async createMany(specifications: Specification[]): Promise<void> {
    specifications.forEach(async (spec) => {
      const alreadyExists = await this.findByName(spec.name);
      if (!alreadyExists) {
        this.specifications.push(spec);
      }
    });
  }

  async findByName(name: string) {
    const specification = this.specifications.find(
      (spec) => spec.name === name
    );
    return specification;
  }

  async list() {
    return this.specifications;
  }
}
