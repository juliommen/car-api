import { hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";
import { UserTokenRepositoryInterface } from "../../repositories/UserTokenRepositoryInterface";

interface Payload {
  sub: string;
  email: string;
}

@injectable()
class ResetPwdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,
    @inject("UserTokenRepository")
    private userTokenRepository: UserTokenRepositoryInterface
  ) {}

  async execute(token: string, pwd: string) {
    try {
      const { sub: userId } = verify(
        token,
        auth.secretForRefreshToken
      ) as Payload;

      const refreshTokenFound = await this.userTokenRepository.findById(
        userId,
        token
      );

      if (!refreshTokenFound) {
        throw new AppError("Recovery token does not exist");
      }

      await this.userTokenRepository.deleteById(refreshTokenFound.id);

      const hashPwd = await hash(pwd, 8);

      await this.usersRepository.updatePassword(userId, hashPwd);
    } catch (error) {
      throw new AppError("Invalid recovery token!", 401);
    }
  }
}

export { ResetPwdUseCase };
