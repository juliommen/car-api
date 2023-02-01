import { Car } from "../../../entities/Car";
import {
  CreateCarDTO,
  CarsRepositoryInterface,
  ListCarDTO,
  CreateCarSpecificationsDTO,
} from "../../CarsRepositoryInterface";
import { SpecificationsRepository } from "./SpecificationsRepository";

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

  async listAvailableCars({
    name,
    brand,
    categoryId,
  }: ListCarDTO): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available);
    if (name) {
      cars = cars.filter((car) => car.name === name);
    }
    if (categoryId) {
      cars = cars.filter((car) => car.categoryId === categoryId);
    }
    if (brand) {
      cars = cars.filter((car) => car.brand === brand);
    }
    return cars;
  }

  async createSpecifications({
    carId,
    specificationsId,
  }: CreateCarSpecificationsDTO): Promise<void> {
    const car = this.cars.find((car) => car.id === carId);
    const specificationRepository = new SpecificationsRepository();
    const specifications = await specificationRepository.list();
    specificationsId.forEach((id) => {
      const spec = specifications.find((spec) => spec.id === id);
      car.specifications.push(spec);
    });
  }
}
