import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";

interface Request {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  avatar: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({ name, driverLicense, email, password, avatar }: Request) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already exists!", 401);
    }
    const pwdHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      driverLicense,
      email,
      password: pwdHash,
      avatar,
    });
  }
}

export { CreateUserUseCase };
