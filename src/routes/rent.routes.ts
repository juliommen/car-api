import { Router } from "express";

import { verifyAdmin } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";
import { CreateRentController } from "../modules/rentals/useCases/createRent/CreateRentController";
import { EndRentController } from "../modules/rentals/useCases/endRent/EndRentController";

export const rentRoutes = Router();

const createRentController = new CreateRentController();
const endRentController = new EndRentController();

rentRoutes.use(verifyToken);
rentRoutes.use(verifyAdmin);
rentRoutes.post("/", createRentController.handle);
rentRoutes.post("/end", endRentController.handle);
