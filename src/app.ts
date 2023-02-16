import "reflect-metadata";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { rateLimiterMiddleware } from "./middlewares/rateLimiterRedis";
import { router } from "./routes/index";
import swaggerFile from "./swagger.json";
import "./providers/container/implementations/tsyringe/Container";
import uploadFile from "./utils/uploadFile";

const app = express();

app.use(rateLimiterMiddleware);

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(cors());
app.use(router);

app.use("/tmp", express.static(uploadFile.tmpFolder));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });
  next();
});

export { app };
