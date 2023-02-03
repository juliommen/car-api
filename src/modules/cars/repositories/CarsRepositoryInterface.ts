import { Car } from "../entities/Car";
import { Specification } from "../entities/Specification";

export interface CreateCarDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

export interface ListCarDTO {
  name?: string;
  brand?: string;
  categoryId?: string;
}

export interface LinkCarSpecificationsDTO {
  carId: string;
  specificationsId: string[];
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
  findById(id: string): Promise<Car>;
  listAvailableCars({ name, brand, categoryId }: ListCarDTO): Promise<Car[]>;
  createSpecifications({
    carId,
    specificationsId,
  }: LinkCarSpecificationsDTO): Promise<void>;
}
