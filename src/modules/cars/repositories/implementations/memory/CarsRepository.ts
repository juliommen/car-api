import { Car } from "../../../entities/Car";
import {
  CreateCarDTO,
  CarsRepositoryInterface,
} from "../../CarsRepositoryInterface";

export class CarsRepository implements CarsRepositoryInterface {
  cars: Car[] = [];
  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: CreateCarDTO) {
    this.cars.push(
      new Car(
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        brand,
        categoryId
      )
    );
  }

  async findByLicensePlate(licensePlate: string) {
    const car = this.cars.find((car) => car.licensePlate === licensePlate);
    return car;
  }

  async findByName(name: string) {
    const car = this.cars.find((car) => car.name === name);
    return car;
  }

  async listAvailableCars(): Promise<Car[]> {
    const cars = this.cars.filter((car) => car.available);
    return cars;
  }
}
