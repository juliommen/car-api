export class CreateCategoryService() {
  execute() {
    const categoryAlreadyExists = !!categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      return res.status(400).json({ error: "This category already exists." });
    }
    categoriesRepository.create({ name, description });
  }
}