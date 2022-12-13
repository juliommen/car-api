import { Router } from "express";

import { InMemoryCategoriesRepository } from "../modules/cars/repositories/Categories/InMemoryRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

export const categoriesRoutes = Router();
const categoriesRepository = new InMemoryCategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });
  return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});
