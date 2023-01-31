import { prisma } from "../../../../../libs/prismaClient";
import { Car } from "../../../entities/Car";
import {
  CreateCarDTO,
  CarsRepositoryInterface,
} from "../../CarsRepositoryInterface";

export class CarsRepository implements CarsRepositoryInterface {
  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
  }: CreateCarDTO) {
    await prisma.car.create({
      data: new Car(
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        brand,
        categoryId
      ),
    });
  }

  async findByLicensePlate(licensePlate: string) {
    const car = await prisma.car.findFirst({ where: { licensePlate } });
    return car;
  }

  async findByName(name: string) {
    const car = await prisma.car.findFirst({ where: { name } });
    return car;
  }

  async listAvailableCars(): Promise<Car[]> {
    const cars = await prisma.car.findMany({ where: { available: true } });
    return cars;
  }
}
