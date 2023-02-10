export interface StorageInterface {
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}
