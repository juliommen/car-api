import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/deleteFile";
import { CarImageRepositoryInterface } from "../../repositories/CarImageRepositoryInterface";

export interface CarImagesRequest {
  carId: string;
  images: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImageRepository")
    private categoriesRepository: CarImageRepositoryInterface
  ) {}

  async execute({ carId, images }: CarImagesRequest) {
    images.map(async (image) => {
      await this.categoriesRepository.create({ carId, image });
      await deleteFile(`./tmp/carImages/${image}`);
    });
  }
}

export { UploadCarImageUseCase };
