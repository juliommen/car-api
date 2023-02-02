import { Router } from "express";

import { verifyAdmin } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { LinkCarSpecificationsController } from "../modules/cars/useCases/linkCarSpecifications/LinkCarSpecificationsController";
import { ListCarsController } from "../modules/cars/useCases/listCars/ListCarsController";

export const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const linkCarSpecifications = new LinkCarSpecificationsController();

carRoutes.use(verifyToken);

carRoutes.post("/", verifyAdmin, createCarController.handle);
carRoutes.get("/", listCarsController.handle);
carRoutes.post("/specifications/:carId", linkCarSpecifications.handle);
