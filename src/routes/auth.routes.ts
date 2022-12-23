import { Router } from "express";

import { AuthUserController } from "../modules/users/useCases/authenticatUser/AuthUserController";

export const authRoutes = Router();

const authUserController = new AuthUserController();

authRoutes.post("/sessions", authUserController.handle);
