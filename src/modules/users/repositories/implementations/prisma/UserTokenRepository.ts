import { prisma } from "../../../../../utils/prismaClient";
import { UserToken } from "../../../entities/UserToken";
import {
  CreateUserTokenDTO,
  UserTokenRepositoryInterface,
} from "../../UserTokenRepositoryInterface";

export class UserTokenRepository implements UserTokenRepositoryInterface {
  async create({ refreshToken, userId }: CreateUserTokenDTO) {
    await prisma.userToken.create({
      data: new UserToken(userId, refreshToken),
    });
  }

  async findById(userId: string, refreshToken: string) {
    const refreshTokenFound = await prisma.userToken.findFirst({
      where: { userId, refreshToken },
    });
    return refreshTokenFound;
  }

  async deleteById(refreshTokenId: string): Promise<void> {
    await prisma.userToken.delete({
      where: { id: refreshTokenId },
    });
  }
}
