import { prisma } from "../../../../../libs/prismaClient";
import { Rent } from "../../../entities/Rent";
import {
  CreateRentDTO,
  RentRepositoryInterface,
} from "../../RentRepositoryInterface";

export class RentRepository implements RentRepositoryInterface {
  async create({
    carId,
    userId,
    expectedReturnDate,
  }: CreateRentDTO): Promise<void> {
    await prisma.rent.create({
      data: new Rent(carId, userId, expectedReturnDate),
    });
  }

  async findCarCurrentRent(carId: string): Promise<Rent> {
    const carRent = await prisma.rent.findFirst({
      where: {
        AND: [
          {
            carId,
          },
          {
            endDate: null,
          },
        ],
      },
    });
    return carRent;
  }

  async findUserCurrentRent(userId: string): Promise<Rent> {
    const userRent = await prisma.rent.findFirst({
      where: {
        AND: [
          {
            userId,
          },
          {
            endDate: null,
          },
        ],
      },
    });
    return userRent;
  }
}
