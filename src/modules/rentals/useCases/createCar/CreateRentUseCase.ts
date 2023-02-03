import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Rent } from "../../entities/Rent";
import {
  RentRepositoryInterface,
  CreateRentDTO,
} from "../../repositories/RentRepositoryInterface";

@injectable()
class CreateRentUseCase {
  constructor(
    @inject("RentRepository")
    private rentRepository: RentRepositoryInterface
  ) {}

  async execute({ carId, userId, expectedReturnDate }: CreateRentDTO) {
    const carRent: Rent = await this.rentRepository.findCarCurrentRent(carId);
    if (carRent) {
      throw new AppError("This car is not available.");
    }
    const userRent: Rent = await this.rentRepository.findUserCurrentRent(
      userId
    );
    if (userRent) {
      throw new AppError("This user already has a registered ongoing rent.");
    }
    await this.rentRepository.create({
      carId,
      userId,
      expectedReturnDate,
    });
  }
}

export { CreateRentUseCase };
