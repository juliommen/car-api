import { randomUUID } from "crypto";

export class CarImage {
  id: string;
  image: string;
  carId: string;
  createdAt: Date;

  constructor(image: string, carId: string) {
    this.id = randomUUID();
    this.image = image;
    this.carId = carId;
    this.createdAt = new Date();
  }
}
