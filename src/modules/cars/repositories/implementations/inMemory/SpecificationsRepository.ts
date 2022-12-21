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
    const specification = new Specification();
    Object.assign(specification, { name, description, created_at: new Date() });
    this.specifications.push(specification);
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
