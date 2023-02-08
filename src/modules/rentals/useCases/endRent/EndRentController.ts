import { Request, Response } from "express";
import { container } from "tsyringe";

import { EndRentUseCase } from "./EndRentUseCase";

export class EndRentController {
  async handle(req: Request, res: Response) {
    const { rentId } = req.body;
    const endRentUseCase = container.resolve(EndRentUseCase);
    await endRentUseCase.execute(rentId);
    return res.status(201).send();
  }
}
