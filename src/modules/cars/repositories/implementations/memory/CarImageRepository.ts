import { CarImage } from "../../../entities/CarImage";
import {
  CarImageRepositoryInterface,
  CreateCarImageDTO,
} from "../../CarImageRepositoryInterface";

export class CarImageRepository implements CarImageRepositoryInterface {
  private carImage: CarImage[] = [];
  async create({ name, carId }: CreateCarImageDTO): Promise<void> {
    this.carImage.push(new CarImage(name, carId));
  }
}
