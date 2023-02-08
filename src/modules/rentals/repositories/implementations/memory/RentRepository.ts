import { Rent } from "../../../entities/Rent";
import {
  CreateRentDTO,
  RentRepositoryInterface,
} from "../../RentRepositoryInterface";

export class RentRepository implements RentRepositoryInterface {
  rent: Rent[] = [];

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: CreateRentDTO): Promise<void> {
    this.rent.push(new Rent(carId, userId, expectedReturnDate));
  }

  async findCarCurrentRent(carId: string): Promise<Rent> {
    const carRent = this.rent.find(
      (rent) => rent.carId === carId && rent.endDate === null
    );
    return carRent;
  }

  async findUserCurrentRent(userId: string): Promise<Rent> {
    const userRent = this.rent.find(
      (rent) => rent.userId === userId && rent.endDate === null
    );
    return userRent;
  }

  async findRentById(rentId: string): Promise<Rent> {
    const rent = this.rent.find((rent) => rent.id === rentId);
    return rent;
  }

  async endRent(rent: Rent, endDate: Date, total: number): Promise<Rent> {
    const rentToUpdate = await this.findRentById(rent.id);
    rentToUpdate.endDate = endDate;
    rentToUpdate.total = total;

    return rentToUpdate;
  }
}
