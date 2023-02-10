import { prisma } from "../../../../../utils/prismaClient";
import { User } from "../../../entities/User";
import {
  CreateUserDTO,
  UsersRepositoryInterface,
} from "../../UsersRepositoryInterface";

export class UsersRepository implements UsersRepositoryInterface {
  async create({
    name,
    driverLicense,
    email,
    password,
    avatar,
  }: CreateUserDTO) {
    await prisma.user.create({
      data: new User(name, email, password, driverLicense, avatar),
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

  async updateAvatar(avatarFile: string, userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarFile },
    });
  }

  async updatePassword(userId: string, pwd: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { password: pwd },
    });
  }
}
