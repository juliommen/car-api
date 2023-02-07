import { Car } from "../../../entities/Car";
import { Specification } from "../../../entities/Specification";
import {
  CreateCarDTO,
  CarsRepositoryInterface,
  ListCarDTO,
  LinkCarSpecificationsDTO,
} from "../../CarsRepositoryInterface";

interface CarInMemory extends Car {
  specificationsId: string[];
}

export class CarsRepository implements CarsRepositoryInterface {
  cars: CarInMemory[] = [];

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: CreateCarDTO) {
    this.cars.push({
      ...new Car(
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        brand,
        categoryId
      ),
      specificationsId: [],
    });
  }

  async findByLicensePlate(licensePlate: string) {
    const car = this.cars.find((car) => car.licensePlate === licensePlate);
    return car;
  }

  async findByName(name: string) {
    const car = this.cars.find((car) => car.name === name);
    return car;
  }

  async findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
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
  }: LinkCarSpecificationsDTO): Promise<void> {
    const car = this.cars.find((car) => car.id === carId);
    car.specificationsId = specificationsId;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.find((car) => car.id === id);
    car.available = available;
  }
}
