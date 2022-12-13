import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

export const specificationsRoutes = Router();
const specificationRepository = new SpecificationsRepository();

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
