import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInterface } from "../../repositories/CarsRepositoryInterface";
import { SpecificationsRepository } from "../../repositories/implementations/prisma/SpecificationsRepository";

@injectable()
class LinkCarSpecificationsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface
  ) {}
  async execute({ carId, specificationsId }) {
    const car = await this.carsRepository.findById(carId);
    if (!car) {
      throw new AppError("Car does not exist.");
    }

    const specificationsRepository = new SpecificationsRepository();
    const listOfSpecifications = await specificationsRepository.list();
    const filteredListOfSpecifications = listOfSpecifications.filter(
      (spec) => specificationsId.indexOf(spec.id) !== -1
    );
    if (filteredListOfSpecifications.length !== specificationsId.length) {
      throw new AppError("One or more specifications do not exist.");
    }

    await this.carsRepository.createSpecifications({
      carId: carId as string,
      specificationsId: specificationsId as string[],
    });
  }
}

export { LinkCarSpecificationsUseCase };
