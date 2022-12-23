import { Router } from "express";

import { verifyToken } from "../middlewares/auth";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

specificationsRoutes.use(verifyToken);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
