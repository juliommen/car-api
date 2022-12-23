import { User } from "../entities/User";

export interface CreateUserDTO {
  name: string;
  email: string;
  driverLicense: string;
  password: string;
}

export interface UsersRepositoryInterface {
  create({
    name,
    email,
    password,
    driverLicense,
  }: CreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
