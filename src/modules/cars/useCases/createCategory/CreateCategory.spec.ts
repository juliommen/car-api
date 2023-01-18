import { AppError } from "../../../../errors/AppError";
import { CategoriesRepository } from "../../repositories/implementations/memory/CategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepository: CategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category Tests", () => {
  beforeEach(() => {
    categoryRepository = CategoriesRepository.getInstance();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it("Should be able to create a new category", async () => {
    const categoryToCreate = {
      name: "Test name",
      description: "Test description",
    };
    await createCategoryUseCase.execute(categoryToCreate);
    const categoryFound = categoryRepository.findByName("Test name");
    expect(categoryFound).toBeTruthy();
  });

  it("Should not be able to create the same category twice", async () => {
    const categoryToCreate = {
      name: "Test name",
      description: "Test description",
    };
    expect(async () => {
      await createCategoryUseCase.execute(categoryToCreate);
    }).rejects.toBeInstanceOf(AppError);
  });
});
