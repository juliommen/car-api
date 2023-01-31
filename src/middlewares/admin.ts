import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/implementations/prisma/UsersRepository";

export async function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.user;
  const user = await new UsersRepository().findById(userId);
  if (user.admin) {
    next();
  } else {
    throw new AppError("User has not privileges for this operation");
  }
}
