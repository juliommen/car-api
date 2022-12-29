import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/deleteFile";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";

interface Request {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({ avatarFile, userId }: Request) {
    await this.usersRepository.updateAvatar(avatarFile, userId);
    await deleteFile(`./tmp/avatar/${avatarFile}`);
  }
}

export { UpdateAvatarUseCase };
