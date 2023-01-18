import { User } from "../../../entities/User";
import {
  CreateUserDTO,
  UsersRepositoryInterface,
} from "../../UsersRepositoryInterface";

export class UsersRepository implements UsersRepositoryInterface {
  users: User[] = [];
  async create({
    name,
    driverLicense,
    email,
    password,
    avatar,
  }: CreateUserDTO) {
    this.users.push(new User(name, email, password, driverLicense, avatar));
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async updateAvatar(avatarFile: string, userId: string) {
    const user = await this.findById(userId);
    user.avatar = avatarFile;
  }
}
