import { inject, injectable } from "tsyringe";

import { StorageInterface } from "../../../../providers/storage/StorageInterface";
import { UserMap } from "../../../../utils/mappers/userMap";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";

@injectable()
class GetProfileUseCase {
  constructor(
    @inject("Storage")
    private storage: StorageInterface,
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);
    return UserMap.toDTO(user);
  }
}

export { GetProfileUseCase };
