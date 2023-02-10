import { Response, Request } from "express";
import { container } from "tsyringe";

import { GetProfileUseCase } from "./GetProfileUseCase";

export class GetProfileController {
  async handle(req: Request, res: Response) {
    const { userId } = req.user;
    const getProfileUseCase = container.resolve(GetProfileUseCase);
    const user = await getProfileUseCase.execute(userId);
    return res.json(user);
  }
}
