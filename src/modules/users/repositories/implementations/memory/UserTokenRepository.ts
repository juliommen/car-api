import { UserToken } from "../../../entities/UserToken";
import {
  CreateUserTokenDTO,
  UserTokenRepositoryInterface,
} from "../../UserTokenRepositoryInterface";

export class UserTokenRepository implements UserTokenRepositoryInterface {
  usersTokens: UserToken[];
  async create({ refreshToken, userId }: CreateUserTokenDTO) {
    this.usersTokens.push(new UserToken(userId, refreshToken));
  }

  async findById(userId: string, refreshToken: string) {
    const refreshTokenFound = this.usersTokens.find(
      (user) => user.id === userId && user.refreshToken === refreshToken
    );
    return refreshTokenFound;
  }

  async deleteById(refreshTokenId: string): Promise<void> {
    const tokenIndex = this.usersTokens.findIndex(
      (token) => token.id === refreshTokenId
    );
    this.usersTokens.splice(tokenIndex, 1);
  }
}
