import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { password, email } = request.headers.authorization;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const userData = await refreshTokenUseCase.execute({ email, password });
    return response.json(userData);
  }
}

export { RefreshTokenController };
