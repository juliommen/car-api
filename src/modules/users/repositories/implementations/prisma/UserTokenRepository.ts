import { prisma } from "../../../../../libs/prismaClient";
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
}
