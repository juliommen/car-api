import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepositoryInterface
  ) {}

  async execute(file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path);
    const categories: Category[] = [];
    const parseFile = parse();
    stream.pipe(parseFile);
    await new Promise((resolve, reject) => {
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push(new Category(name, description));
        })
        .on("end", async () => {
          this.categoriesRepository.createMany(categories);
          fs.promises.unlink(file.path);
          resolve("ok");
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
}

export { ImportCategoriesUseCase };
