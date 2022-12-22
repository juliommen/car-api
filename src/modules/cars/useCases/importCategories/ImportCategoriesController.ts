import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  async handle(req: Request, res: Response) {
    const { file } = req;
    await this.importCategoriesUseCase.execute(file);
    return res.status(201).send();
  }
}
