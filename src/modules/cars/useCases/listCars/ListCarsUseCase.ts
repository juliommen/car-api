import { inject, injectable } from "tsyringe";

import { CarsRepositoryInterface } from "../../repositories/CarsRepositoryInterface";

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface
  ) {}
  async execute() {
    const cars = await this.carsRepository.listAvailableCars();
    return cars;
  }
}

export { ListCarsUseCase };
