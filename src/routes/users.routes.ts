import { Router } from "express";
import multer from "multer";

import { verifyToken } from "../middlewares/auth";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "../modules/users/useCases/updateUserAvatar/UpdateAvatarController";
import { uploadFile } from "../utils/uploadFile";

export const usersRoutes = Router();

const uploadAvatar = multer(uploadFile("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  verifyToken,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);
