import { prisma } from "../../../../../utils/prismaClient";
import { Car } from "../../../entities/Car";
import {
  CreateCarDTO,
  CarsRepositoryInterface,
  ListCarDTO,
  LinkCarSpecificationsDTO,
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

  async findById(id: string) {
    const car = await prisma.car.findFirst({ where: { id } });
    return car;
  }

  async listAvailableCars({
    name,
    brand,
    categoryId,
  }: ListCarDTO): Promise<Car[]> {
    let cars = await prisma.car.findMany({
      include: { specifications: true },
      where: { available: true },
    });
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
    const specObj = specificationsId.map((spec) => {
      return { id: spec };
    });
    await prisma.car.update({
      where: { id: carId },
      data: {
        specifications: {
          connect: specObj,
        },
      },
    });
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await prisma.car.update({
      where: { id },
      data: {
        available,
      },
    });
  }
}
