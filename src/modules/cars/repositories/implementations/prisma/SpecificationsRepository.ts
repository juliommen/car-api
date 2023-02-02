import { prisma } from "../../../../../libs/prismaClient";
import { Specification } from "../../../entities/Specification";
import {
  SpecificationsRepositoryInterface,
  CreateSpecificationDTO,
} from "../../SpecificationsRepositoryInterface";

export class SpecificationsRepository
  implements SpecificationsRepositoryInterface
{
  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    await prisma.specification.create({
      data: new Specification(name, description),
    });
  }

  async createMany(specifications: Specification[]): Promise<void> {
    await prisma.specification.createMany({ data: specifications });
  }

  async list(): Promise<Specification[]> {
    const specifications = await prisma.specification.findMany();
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await prisma.specification.findFirst({
      where: { name },
    });
    return specification;
  }
}
