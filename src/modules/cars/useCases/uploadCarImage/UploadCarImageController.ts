import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface File {
  filename: string;
}

export class UploadCarImageController {
  async handle(req: Request, res: Response) {
    const { carId } = req.params;
    const imageFiles = req.files as File[];
    const images = imageFiles.map((image) => image.filename);
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
    await uploadCarImageUseCase.execute({ carId, images });
    return res.status(201).send();
  }
}
