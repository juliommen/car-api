import { inject, injectable } from "tsyringe";

import { StorageInterface } from "../../../../providers/storage/StorageInterface";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";

interface Request {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,
    @inject("Storage")
    private storage: StorageInterface
  ) {}

  async execute({ avatarFile, userId }: Request) {
    const user = await this.usersRepository.findById(userId);
    if (user.avatar) {
      await this.storage.delete(user.avatar, "avatar");
    }
    const url = await this.storage.save(avatarFile, "avatar");
    await this.usersRepository.updateAvatar(url, userId);
  }
}

export { UpdateAvatarUseCase };
