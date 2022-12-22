import { Specification } from "../entities/Specification";

export interface CreateSpecificationDTO {
  name: string;
  description: string;
}

export interface SpecificationsRepositoryInterface {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
  createMany(specifications: Specification[]): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}
