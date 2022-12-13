import { Specification } from "../../models/Specification";
import {
  SpecificationRepositoryInterface,
  CreateSpecificationDTO,
} from "./RepositoryInterface";

export class InMemorySpecificationRepository
  implements SpecificationRepositoryInterface
{
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
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
