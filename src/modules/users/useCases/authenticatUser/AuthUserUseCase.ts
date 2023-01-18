import "reflect-metadata";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";

interface RequestType {
  email: string;
  password: string;
}

interface ResponseType {
  name: string;
  email: string;
  token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface
  ) {}
  async execute({ email, password }: RequestType): Promise<ResponseType> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect.", 401);
    }
    const isPwdCorrect = await compare(password, user.password);
    if (!isPwdCorrect) {
      throw new AppError("Email or password incorrect.", 401);
    }
    const token = sign({}, "skjd00w94---==-fgsh*/fd", {
      subject: user.id,
      expiresIn: "1d",
    });
    return {
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserUseCase };
