import { Car } from "../entities/Car";

export interface CreateCarDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

export interface CarsRepositoryInterface {
  create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: CreateCarDTO): Promise<void>;
  findByName(name: string): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  listAvailableCars(): Promise<Car[]>;
}
