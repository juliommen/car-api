import { prisma } from "../../../../../libs/prismaClient";
import { Specification } from "../../../entities/Specification";
import {
  SpecificationsRepositoryInterface,
  CreateSpecificationDTO,
} from "../../SpecificationsRepositoryInterface";

export class SpecificationsRepository
  implements SpecificationsRepositoryInterface
{
  async create({ name, description }: CreateSpecificationDTO) {
    const specification = new Specification(name, description);
    await prisma.specification.create({
      data: {
        ...specification,
      },
    });
  }

  async list() {
    const categories = await prisma.specification.findMany();
    return categories;
  }

  async findByName(name: string) {
    const specification = await prisma.specification.findFirst({
      where: { name },
    });
    return specification;
  }
}
