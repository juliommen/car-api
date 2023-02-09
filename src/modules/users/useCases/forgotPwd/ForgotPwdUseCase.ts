import { sign } from "jsonwebtoken";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { MailProviderInterface } from "../../../../shared/mailProvider/MailProviderInterface";
import { UsersRepositoryInterface } from "../../repositories/UsersRepositoryInterface";
import { UserTokenRepositoryInterface } from "../../repositories/UserTokenRepositoryInterface";

@injectable()
class ForgotPwdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,
    @inject("UserTokenRepository")
    private userTokenRepository: UserTokenRepositoryInterface,
    @inject("MailProvider")
    private mailProvider: MailProviderInterface
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found");
    }

    const recoveryToken = sign({ email }, auth.secretForRefreshToken, {
      subject: user.id,
      expiresIn: auth.expirationRecoveryToken,
    });

    await this.userTokenRepository.create({
      refreshToken: recoveryToken,
      userId: user.id,
    });

    const variables = {
      name: user.name,
      link: process.env.RESET_PWD_LINK + recoveryToken,
    };

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "utils",
      "templates",
      "forgotPassword.hbs"
    );

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { ForgotPwdUseCase };
