import { Router } from "express";
import multer from "multer";

import { verifyToken } from "../middlewares/auth";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { GetProfileController } from "../modules/users/useCases/getProfile/GetProfileController";
import { UpdateAvatarController } from "../modules/users/useCases/updateUserAvatar/UpdateAvatarController";
import upload from "../utils/uploadFile";

export const usersRoutes = Router();

const uploadAvatar = multer(upload);

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const getProfileController = new GetProfileController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", verifyToken, getProfileController.handle);

usersRoutes.patch(
  "/avatar",
  verifyToken,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);
