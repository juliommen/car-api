import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

export const categoryRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoryRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  categoriesRepository.create({ name, description });
  return res.status(201).send();
});

categoryRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});
