import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
      await this.createCategoryUseCase.execute({ name, description });
    } catch (error) {
      return res.status(500).json({ error: "Category already exists" });
    }

    return res.status(201).send();
  }
}
