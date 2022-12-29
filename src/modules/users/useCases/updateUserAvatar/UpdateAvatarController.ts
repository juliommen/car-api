import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";

export class UpdateAvatarController {
  async handle(req: Request, res: Response) {
    const avatarFile = req.file.filename;
    const { userId } = req.user;
    const updtateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updtateAvatarUseCase.execute({ avatarFile, userId });

    return res.status(201).send();
  }
}
