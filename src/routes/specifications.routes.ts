import { Router } from "express";

import { InMemorySpecificationRepository } from "../modules/cars/repositories/Specification/InMemoryRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

export const specificationsRoutes = Router();
const specificationRepository = new InMemorySpecificationRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const createspecficationService = new CreateSpecificationService(
    specificationRepository
  );
  createspecficationService.execute({ name, description });
  return res.status(201).send();
});

specificationsRoutes.get("/", (req, res) => {
  const Specification = specificationRepository.list();
  return res.json(Specification);
});
