export interface CreateUserTokenDTO {
  refreshToken: string;
  userId: string;
}

export interface UserTokenRepositoryInterface {
  create({ refreshToken, userId }: CreateUserTokenDTO): Promise<void>;
}
