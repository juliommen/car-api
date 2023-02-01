import { inject, injectable } from "tsyringe";

import {
  CarsRepositoryInterface,
  CreateCarSpecificationsDTO,
} from "../../repositories/CarsRepositoryInterface";

@injectable()
class CreateCarSpecificationsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface
  ) {}
  async execute({ carId, specificationsId }: CreateCarSpecificationsDTO) {}
}

export { CreateCarSpecificationsUseCase };
