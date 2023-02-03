export interface CreateCarImageDTO {
  image: string;
  carId: string;
}

export interface CarImageRepositoryInterface {
  create({ image, carId }: CreateCarImageDTO): Promise<void>;
}
