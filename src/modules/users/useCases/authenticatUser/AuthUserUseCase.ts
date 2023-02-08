import "reflect-metadata";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";
import { UserTokenRepositoryInterface } from "../../repositories/UserTokenRepositoryInterface";

interface RequestType {
  email: string;
  password: string;
}

interface ResponseType {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,
    @inject("UserTokenRepository")
    private usersTokenRepository: UserTokenRepositoryInterface
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

    const token = sign({}, auth.secretForClientToken, {
      subject: user.id,
      expiresIn: auth.expirationClientToken,
    });

    const refreshToken = sign(
      { email: user.email },
      auth.secretForRefreshToken,
      {
        subject: user.id,
        expiresIn: auth.expirationRefreshToken,
      }
    );

    this.usersTokenRepository.create({
      refreshToken,
      userId: user.id,
    });

    return {
      name: user.name,
      email: user.email,
      token,
      refreshToken,
    };
  }
}

export { AuthUserUseCase };
