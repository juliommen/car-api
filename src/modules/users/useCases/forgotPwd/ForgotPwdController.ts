import { Request, Response } from "express";
import { container } from "tsyringe";

import { ForgotPwdUseCase } from "./ForgotPwdUseCase";

export class ForgotPwdController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;
    const forgotPwdUseCase = container.resolve(ForgotPwdUseCase);

    await forgotPwdUseCase.execute(email);

    return res.status(201).send();
  }
}
