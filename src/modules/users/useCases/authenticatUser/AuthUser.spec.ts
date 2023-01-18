import { hash } from "bcrypt";

import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../repositories/implementations/memory/UsersRepository";
import { CreateUserDTO } from "../../repositories/UsersRepositoryInterface";
import { AuthUserUseCase } from "./AuthUserUseCase";

let authUserUseCase: AuthUserUseCase;
let usersRepository: UsersRepository;
let user: CreateUserDTO;

describe("Authenticate User Tests", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    const password = await hash("teste123", 8);
    user = {
      avatar: "teste.jpeg",
      email: "teste@gmail.com",
      name: "teste",
      password,
      driverLicense: "123",
    };
    usersRepository.create(user);
    authUserUseCase = new AuthUserUseCase(usersRepository);
  });
  it("Should be able to authenticate user", async () => {
    const token = await authUserUseCase.execute({
      email: user.email,
      password: "teste123",
    });
    expect(token).toHaveProperty("token");
  });

  it("Should not be able to authenticate user not found", () => {
    expect(async () => {
      await authUserUseCase.execute({
        email: "emailinexistente",
        password: "teste123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate user with incorrect password", () => {
    expect(async () => {
      await authUserUseCase.execute({
        email: user.email,
        password: "teste1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
