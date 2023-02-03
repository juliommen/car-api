import { container } from "tsyringe";

import { CarImageRepositoryInterface } from "../../modules/cars/repositories/CarImageRepositoryInterface";
import { CarsRepositoryInterface } from "../../modules/cars/repositories/CarsRepositoryInterface";
import { CategoriesRepositoryInterface } from "../../modules/cars/repositories/CategoriesRepositoryInterface";
import { CarImageRepository } from "../../modules/cars/repositories/implementations/prisma/CarImageRepository";
import { CarsRepository } from "../../modules/cars/repositories/implementations/prisma/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/prisma/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/prisma/SpecificationsRepository";
import { SpecificationsRepositoryInterface } from "../../modules/cars/repositories/SpecificationsRepositoryInterface";
import { RentRepository } from "../../modules/rentals/repositories/implementations/prisma/RentRepository";
import { RentRepositoryInterface } from "../../modules/rentals/repositories/RentRepositoryInterface";
import { UsersRepository } from "../../modules/users/repositories/implementations/prisma/UsersRepository";
import { UsersRepositoryInterface } from "../../modules/users/repositories/UsersRepositoryInterface";

container.registerSingleton<CategoriesRepositoryInterface>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<SpecificationsRepositoryInterface>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<UsersRepositoryInterface>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<CarsRepositoryInterface>(
  "CarsRepository",
  CarsRepository
);

container.registerSingleton<CarImageRepositoryInterface>(
  "CarImageRepository",
  CarImageRepository
);

container.registerSingleton<RentRepositoryInterface>(
  "RentRepository",
  RentRepository
);
