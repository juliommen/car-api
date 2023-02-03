import { Router } from "express";
import multer from "multer";

import { verifyAdmin } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";
import { CreateCarController } from "../modules/cars/useCases/createCar/CreateCarController";
import { LinkCarSpecificationsController } from "../modules/cars/useCases/linkCarSpecifications/LinkCarSpecificationsController";
import { ListCarsController } from "../modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { uploadFile } from "../utils/uploadFile";

export const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const linkCarSpecifications = new LinkCarSpecificationsController();
const uploadCarImage = new UploadCarImageController();

carRoutes.use(verifyToken);
carRoutes.get("/", listCarsController.handle);

carRoutes.use(verifyAdmin);
carRoutes.post("/", createCarController.handle);
carRoutes.post("/specifications/:carId", linkCarSpecifications.handle);

const upload = multer(uploadFile("./tmp/carImages"));
carRoutes.post("/images/:carId", upload.array("images"), uploadCarImage.handle);
