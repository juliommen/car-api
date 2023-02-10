import { container } from "tsyringe";

import { CarImageRepositoryInterface } from "../../../../modules/cars/repositories/CarImageRepositoryInterface";
import { CarsRepositoryInterface } from "../../../../modules/cars/repositories/CarsRepositoryInterface";
import { CategoriesRepositoryInterface } from "../../../../modules/cars/repositories/CategoriesRepositoryInterface";
import { CarImageRepository } from "../../../../modules/cars/repositories/implementations/prisma/CarImageRepository";
import { CarsRepository } from "../../../../modules/cars/repositories/implementations/prisma/CarsRepository";
import { CategoriesRepository } from "../../../../modules/cars/repositories/implementations/prisma/CategoriesRepository";
import { SpecificationsRepository } from "../../../../modules/cars/repositories/implementations/prisma/SpecificationsRepository";
import { SpecificationsRepositoryInterface } from "../../../../modules/cars/repositories/SpecificationsRepositoryInterface";
import { RentRepository } from "../../../../modules/rentals/repositories/implementations/prisma/RentRepository";
import { RentRepositoryInterface } from "../../../../modules/rentals/repositories/RentRepositoryInterface";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/prisma/UsersRepository";
import { UserTokenRepository } from "../../../../modules/users/repositories/implementations/prisma/UserTokenRepository";
import { UsersRepositoryInterface } from "../../../../modules/users/repositories/UsersRepositoryInterface";
import { UserTokenRepositoryInterface } from "../../../../modules/users/repositories/UserTokenRepositoryInterface";
import { MailProvider } from "../../../mail/implementations/ethereal/MailProvider";
import { MailProviderInterface } from "../../../mail/MailProviderInterface";
import { Storage } from "../../../storage/implementations/memory/Storage";
import { StorageInterface } from "../../../storage/StorageInterface";

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

container.registerSingleton<UserTokenRepositoryInterface>(
  "UserTokenRepository",
  UserTokenRepository
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

container.registerInstance<MailProviderInterface>(
  "MailProvider",
  new MailProvider()
);

container.registerSingleton<StorageInterface>("Storage", Storage);
