import { Car } from "@prisma/client";

import { Rent } from "../entities/Rent";

export interface CreateRentDTO {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

export interface RentRepositoryInterface {
  create({ carId, userId, expectedReturnDate }: CreateRentDTO): Promise<void>;
  findCarCurrentRent(carId: string): Promise<Rent>;
  findUserCurrentRent(userId: string): Promise<Rent>;
  findRentById(rentId: string): Promise<Rent>;
  endRent(rent: Rent, endDate: Date, total: number): Promise<Rent>;
}
