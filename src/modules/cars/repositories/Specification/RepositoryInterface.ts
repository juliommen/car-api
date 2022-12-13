import { Specification } from "../../models/Specification";

export interface CreateSpecificationDTO {
  name: string;
  description: string;
}

export interface SpecificationRepositoryInterface {
  create({ name, description }: CreateSpecificationDTO): void;
  findByName(name: string): Specification;
  list(): Specification[];
}
