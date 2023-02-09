import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPwdUseCase } from "./ResetPwdUseCase";

export class ResetPwdController {
  async handle(req: Request, res: Response) {
    const { token } = req.query;
    const { pwd } = req.body;
    const resetPwdUseCase = container.resolve(ResetPwdUseCase);

    await resetPwdUseCase.execute(token as string, pwd as string);

    return res.status(201).send();
  }
}
