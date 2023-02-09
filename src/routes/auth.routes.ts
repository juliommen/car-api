import { Router } from "express";

import { AuthUserController } from "../modules/users/useCases/authenticatUser/AuthUserController";
import { ForgotPwdController } from "../modules/users/useCases/forgotPwd/ForgotPwdController";
import { RefreshTokenController } from "../modules/users/useCases/refreshToken/RefreshTokenController";
import { ResetPwdController } from "../modules/users/useCases/resetPwd/ResetPwdController";

export const authRoutes = Router();

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();
const forgotPwdController = new ForgotPwdController();
const resetPwdController = new ResetPwdController();

authRoutes.post("/", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);
authRoutes.post("/forgot-pwd", forgotPwdController.handle);
authRoutes.post("/reset-pwd", resetPwdController.handle);
