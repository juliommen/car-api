import "reflect-metadata";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { UserTokenRepositoryInterface } from "../../repositories/UserTokenRepositoryInterface";

interface Payload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private usersTokenRepository: UserTokenRepositoryInterface
  ) {}
  async execute(refreshToken: string) {
    const { sub: userId, email } = verify(
      refreshToken,
      auth.secretForRefreshToken
    ) as Payload;

    const refreshTokenFound = await this.usersTokenRepository.findById(
      userId,
      refreshToken
    );

    if (!refreshTokenFound) {
      throw new AppError("Refresh token does not exist");
    }

    await this.usersTokenRepository.deleteById(refreshTokenFound.id);

    const newRefreshToken = sign({ email }, auth.secretForRefreshToken, {
      subject: userId,
      expiresIn: auth.expirationRefreshToken,
    });

    this.usersTokenRepository.create({
      refreshToken: newRefreshToken,
      userId,
    });

    return { refreshToken: newRefreshToken };
  }
}

export { RefreshTokenUseCase };
