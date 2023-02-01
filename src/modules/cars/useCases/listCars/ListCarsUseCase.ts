import { inject, injectable } from "tsyringe";

import {
  CarsRepositoryInterface,
  ListCarDTO,
} from "../../repositories/CarsRepositoryInterface";

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface
  ) {}
  async execute({ brand, categoryId, name }: ListCarDTO) {
    const cars = await this.carsRepository.listAvailableCars({
      brand,
      categoryId,
      name,
    });
    return cars;
  }
}

export { ListCarsUseCase };
