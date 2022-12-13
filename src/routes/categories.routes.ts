import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

export const categoryRoutes = Router();

categoryRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const categoryAlreadyExists = !!categoriesRepository.findByName(name);
  if (categoryAlreadyExists) {
    return res.status(400).json({ error: "This category already exists." });
  }
  categoriesRepository.create({ name, description });
  return res.status(201).send();
});

categoryRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});
