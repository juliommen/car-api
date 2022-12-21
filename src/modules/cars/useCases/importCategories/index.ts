import { CategoriesRepository } from "../../repositories/implementations/prisma/CategoriesRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const categoriesRepository = new CategoriesRepository();
const importCategoriesUseCase = new ImportCategoriesUseCase(
  categoriesRepository
);
export const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
);
