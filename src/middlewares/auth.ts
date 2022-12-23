import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/implementations/prisma/UsersRepository";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const { sub: userId } = verify(token, "skjd00w94---==-fgsh*/fd");

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(userId as string);
    if (!user) {
      throw new AppError("Invalid token!", 401);
    }
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

  next();
}
