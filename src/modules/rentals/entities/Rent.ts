import { randomUUID } from "crypto";

export class Rent {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  expectedReturnDate: Date;
  total: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    carId: string,
    userId: string,
    startDate: Date,
    endDate: Date,
    expectedReturnDate: Date,
    total: number
  ) {
    this.id = randomUUID();
    this.carId = carId;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.expectedReturnDate = expectedReturnDate;
    this.total = total;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
