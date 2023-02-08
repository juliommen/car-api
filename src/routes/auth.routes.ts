import { Router } from "express";

import { AuthUserController } from "../modules/users/useCases/authenticatUser/AuthUserController";
import { RefreshTokenController } from "../modules/users/useCases/refreshToken/RefreshTokenController";

export const authRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);
