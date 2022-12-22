import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    try {
      await createCategoryUseCase.execute({ name, description });
    } catch (error) {
      return res.status(500).json({ error: "Category already exists" });
    }

    return res.status(201).send();
  }
}
