import { Router } from "express";

import { verifyAdmin } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

specificationsRoutes.use(verifyToken);

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  verifyAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
