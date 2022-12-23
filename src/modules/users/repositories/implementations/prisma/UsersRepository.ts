import { prisma } from "../../../../../libs/prismaClient";
import { User } from "../../../entities/User";
import {
  CreateUserDTO,
  UsersRepositoryInterface,
} from "../../UsersRepositoryInterface";

export class UsersRepository implements UsersRepositoryInterface {
  async create({ name, driverLicense, email, password }: CreateUserDTO) {
    await prisma.user.create({
      data: new User(name, email, password, driverLicense),
    });
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
  }
}
