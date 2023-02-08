import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInterface } from "../../../cars/repositories/CarsRepositoryInterface";
import { Rent } from "../../entities/Rent";
import { RentRepositoryInterface } from "../../repositories/RentRepositoryInterface";

@injectable()
class EndRentUseCase {
  constructor(
    @inject("RentRepository")
    private rentRepository: RentRepositoryInterface,
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface
  ) {}

  async execute(rentId: string) {
    const rent: Rent = await this.rentRepository.findRentById(rentId);
    if (!rent) {
      throw new AppError("This rent does not exist.");
    }
    if (rent.endDate) {
      throw new AppError("Rent has already ended.");
    }
    const { fineAmount, dailyRate } = await this.carsRepository.findById(
      rent.carId
    );
    const { expectedReturnDate, startDate } = rent;
    const endDate = new Date();
    let total = 0;
    const daysRented = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    let delayDays = 0;
    if (endDate.getTime() > expectedReturnDate.getTime()) {
      delayDays = Math.ceil(
        (endDate.getTime() - expectedReturnDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }
    total = delayDays * fineAmount + daysRented * dailyRate;
    const rentUpdated: Rent = await this.rentRepository.endRent(
      rent,
      endDate,
      total
    );

    await this.carsRepository.updateAvailable(rentUpdated.carId, true);
  }
}

export { EndRentUseCase };
