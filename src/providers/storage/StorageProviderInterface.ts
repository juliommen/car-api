export interface StorageProviderInterface {
  save(file: string): Promise<string>;
  delete(file: string): Promise<string>;
}
