import { container } from "tsyringe";

import { CategoriesRepositoryInterface } from "../../modules/cars/repositories/CategoriesRepositoryInterface";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/prisma/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/prisma/SpecificationsRepository";
import { SpecificationsRepositoryInterface } from "../../modules/cars/repositories/SpecificationsRepositoryInterface";
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
