import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

export class CreateCarSpecificationsController {
  async handle(req: Request, res: Response) {
    const createCarSpecifications = container.resolve(
      CreateCarSpecificationsUseCase
    );
    const { carId } = req.params;
    const { specificationsId } = req.body;
    const cars = await createCarSpecifications.execute({
      carId,
      specificationsId,
    });
    return res.json(cars);
  }
}
