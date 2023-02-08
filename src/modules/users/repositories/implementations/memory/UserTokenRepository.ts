import { UserToken } from "../../../entities/UserToken";
import {
  CreateUserTokenDTO,
  UserTokenRepositoryInterface,
} from "../../UserTokenRepositoryInterface";

export class UserTokenRepository implements UserTokenRepositoryInterface {
  usersTokens: UserToken[];
  async create({ expiration, refreshToken, userId }: CreateUserTokenDTO) {
    this.usersTokens.push(new UserToken(userId, refreshToken, expiration));
  }
}
