import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refreshToken } =
      request.body || request.headers["x-access-token"] || request.query;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const newTokens = await refreshTokenUseCase.execute(refreshToken);
    return response.json(newTokens);
  }
}

export { RefreshTokenController };
