import { randomUUID } from "crypto";

export class Rent {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  expectedReturnDate: Date;
  createdAt: Date;
  endDate: Date | undefined;
  total: number | undefined;
  updatedAt: Date | undefined;

  constructor(carId: string, userId: string, expectedReturnDate: Date) {
    this.id = randomUUID();
    this.carId = carId;
    this.userId = userId;
    this.startDate = new Date();
    this.expectedReturnDate = expectedReturnDate;
    this.createdAt = new Date();
    this.endDate = undefined;
    this.total = undefined;
    this.updatedAt = undefined;
  }
}
