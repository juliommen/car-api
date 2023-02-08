import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { password, email } = request.body;
    const authUserUseCase = container.resolve(AuthUserUseCase);
    const userData = await authUserUseCase.execute({ email, password });
    return response.json(userData);
  }
}

export { AuthUserController };
