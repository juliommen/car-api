import { User } from "../../modules/users/entities/User";

export class UserMap {
  static toDTO({ id, email, name, avatar, driverLicense }: User) {
    return { id, email, name, avatar, driverLicense };
  }
}
