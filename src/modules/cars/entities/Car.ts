import { randomUUID } from "crypto";

import { Specification } from "./Specification";

export class Car {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  available: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  createdAt: Date;
  specifications?: Specification[];

  constructor(
    name: string,
    description: string,
    dailyRate: number,
    licensePlate: string,
    fineAmount: number,
    brand: string,
    categoryId: string
  ) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.dailyRate = dailyRate;
    this.available = true;
    this.licensePlate = licensePlate;
    this.fineAmount = fineAmount;
    this.brand = brand;
    this.categoryId = categoryId;
    this.createdAt = new Date();
  }
}
