import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentUseCase } from "./CreateRentUseCase";

export class CreateRentController {
  async handle(req: Request, res: Response) {
    const { carId, userId, expectedReturnDate } = req.body;
    const createRentUseCase = container.resolve(CreateRentUseCase);
    await createRentUseCase.execute({
      carId,
      userId,
      expectedReturnDate: new Date(expectedReturnDate),
    });
    return res.status(201).send();
  }
}
