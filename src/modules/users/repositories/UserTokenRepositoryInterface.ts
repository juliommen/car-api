import { UserToken } from "../entities/UserToken";

export interface CreateUserTokenDTO {
  refreshToken: string;
  userId: string;
}

export interface UserTokenRepositoryInterface {
  create({ refreshToken, userId }: CreateUserTokenDTO): Promise<void>;
  findById(userId: string, refreshToken: string): Promise<UserToken>;
  deleteById(refreshTokenId: string): Promise<void>;
}
