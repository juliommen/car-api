import { Router } from "express";

import { verifyAdmin } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";
import { CreateRentController } from "../modules/rentals/useCases/createCar/CreateRentController";

export const rentRoutes = Router();

const createRentController = new CreateRentController();

rentRoutes.use(verifyToken);
rentRoutes.use(verifyAdmin);
rentRoutes.post("/", createRentController.handle);
