import { prisma } from "../../../../../libs/prismaClient";
import { CarImage } from "../../../entities/CarImage";
import {
  CarImageRepositoryInterface,
  CreateCarImageDTO,
} from "../../CarImageRepositoryInterface";

export class CarImageRepository implements CarImageRepositoryInterface {
  async create({ image, carId }: CreateCarImageDTO): Promise<void> {
    await prisma.carsImages.create({
      data: new CarImage(image, carId),
    });
  }
}
