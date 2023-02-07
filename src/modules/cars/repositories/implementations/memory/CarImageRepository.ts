import { CarImage } from "../../../entities/CarImage";
import {
  CarImageRepositoryInterface,
  CreateCarImageDTO,
} from "../../CarImageRepositoryInterface";

export class CarImageRepository implements CarImageRepositoryInterface {
  private carImage: CarImage[] = [];
  async create({ image, carId }: CreateCarImageDTO): Promise<void> {
    this.carImage.push(new CarImage(image, carId));
  }
}
