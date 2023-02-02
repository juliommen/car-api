import { Request, Response } from "express";
import { container } from "tsyringe";

import { LinkCarSpecificationsUseCase } from "./LinkCarSpecificationsUseCase";

export class LinkCarSpecificationsController {
  async handle(req: Request, res: Response) {
    const linkCarSpecifications = container.resolve(
      LinkCarSpecificationsUseCase
    );
    const { carId } = req.params;
    const { specificationsId } = req.body;
    const cars = await linkCarSpecifications.execute({
      carId: carId as string,
      specificationsId: specificationsId as string[],
    });
    return res.json(cars);
  }
}
