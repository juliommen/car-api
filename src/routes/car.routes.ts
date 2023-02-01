import { Router } from "express";

import { verifyAdmin } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "../modules/cars/useCases/listCars/ListCarsController";

export const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carRoutes.use(verifyToken);

carRoutes.post("/", verifyAdmin, createCarController.handle);
carRoutes.get("/", listCarsController.handle);
carRoutes.post("/specifications/:id");
