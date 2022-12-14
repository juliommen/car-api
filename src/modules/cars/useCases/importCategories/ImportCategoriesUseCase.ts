import { parse } from "csv-parse";
import fs from "fs";

import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

interface ImportCategory {
  name: string;
  description: string;
}

export class ImportCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  loadCategories(file: Express.Multer.File): Promise<ImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ImportCategory[] = [];
      const parseFile = parse();
      stream.pipe(parseFile);
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }
  async execute(file: Express.Multer.File) {
    const categories: ImportCategory[] = await this.loadCategories(file);
    categories.forEach((category) => {
      const { name, description } = category;
      const existCategory = !!this.categoriesRepository.findByName(name);
      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
