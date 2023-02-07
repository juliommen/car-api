import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import {
  CarsRepositoryInterface,
  CreateCarDTO,
} from "../../repositories/CarsRepositoryInterface";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface
  ) {}

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: CreateCarDTO) {
    const carAlreadyExists = await this.carsRepository.findByName(name);
    if (carAlreadyExists) {
      throw new AppError("Car already exists!", 401);
    }
    const carSameLicensePlate = await this.carsRepository.findByLicensePlate(
      licensePlate
    );
    if (carSameLicensePlate) {
      throw new AppError(
        "Car with the same license plate already exists!",
        401
      );
    }
    try {
      await this.carsRepository.create({
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        brand,
        categoryId,
      });
    } catch (error) {
      throw new AppError("Could not create. Check the information sent.", 401);
    }
  }
}

export { CreateCarUseCase };
