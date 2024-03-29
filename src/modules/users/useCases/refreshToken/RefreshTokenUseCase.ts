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
    private userTokenRepository: UserTokenRepositoryInterface
  ) {}
  async execute(refreshToken: string) {
    try {
      const { sub: userId, email } = verify(
        refreshToken,
        auth.secretForRefreshToken
      ) as Payload;

      const refreshTokenFound = await this.userTokenRepository.findById(
        userId,
        refreshToken
      );

      if (!refreshTokenFound) {
        throw new AppError("Refresh token does not exist");
      }

      await this.userTokenRepository.deleteById(refreshTokenFound.id);

      const newRefreshToken = sign({ email }, auth.secretForRefreshToken, {
        subject: userId,
        expiresIn: auth.expirationRefreshToken,
      });

      const newToken = sign({}, auth.secretForClientToken, {
        subject: userId,
        expiresIn: auth.expirationClientToken,
      });

      await this.userTokenRepository.create({
        refreshToken: newRefreshToken,
        userId,
      });

      return { newToken, newRefreshToken };
    } catch (error) {
      throw new AppError("Invalid refresh token!", 401);
    }
  }
}

export { RefreshTokenUseCase };
