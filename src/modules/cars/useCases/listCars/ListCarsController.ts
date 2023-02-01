import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
  async handle(req: Request, res: Response) {
    const listCarsUseCase = container.resolve(ListCarsUseCase);
    const { name, categoryId, brand } = req.query;
    const cars = await listCarsUseCase.execute({
      brand: brand as string,
      categoryId: categoryId as string,
      name: name as string,
    });
    return res.json(cars);
  }
}
