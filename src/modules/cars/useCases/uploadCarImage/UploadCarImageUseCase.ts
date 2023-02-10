import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { StorageInterface } from "../../../../providers/storage/StorageInterface";
import { CarImageRepositoryInterface } from "../../repositories/CarImageRepositoryInterface";
import { CarsRepositoryInterface } from "../../repositories/CarsRepositoryInterface";

export interface CarImagesRequest {
  carId: string;
  images: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImageRepository")
    private categoriesRepository: CarImageRepositoryInterface,
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryInterface,
    @inject("Storage")
    private storage: StorageInterface
  ) {}

  async execute({ carId, images }: CarImagesRequest) {
    const car = this.carsRepository.findById(carId);
    if (!car) {
      throw new AppError("Car does not exist");
    }
    if (images.length === 0) {
      throw new AppError("No images sent");
    }
    images.map(async (image) => {
      const url = await this.storage.save(image, "car");
      await this.categoriesRepository.create({ carId, image: url });
    });
  }
}

export { UploadCarImageUseCase };
