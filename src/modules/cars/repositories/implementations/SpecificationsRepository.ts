import { Specification } from "../../models/Specification";
import {
  SpecificationsRepositoryInterface,
  CreateSpecificationDTO,
} from "../SpecificationsRepositoryInterface";

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

  create({ name, description }: CreateSpecificationDTO) {
    const specification = new Specification();
    Object.assign(specification, { name, description, created_at: new Date() });
    this.specifications.push(specification);
  }

  findByName(name: string) {
    const specification = this.specifications.find(
      (spec) => spec.name === name
    );
    return specification;
  }

  list(): Specification[] {
    return this.specifications;
  }
}
