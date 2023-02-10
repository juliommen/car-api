import fs from "fs";
import { resolve } from "path";

import upload from "../../../../utils/uploadFile";
import { StorageInterface } from "../../StorageInterface";

export class Storage implements StorageInterface {
  async save(file: string, folder: string): Promise<string> {
    console.log(upload.tmpFolder);
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );
    const url = `${process.env.LOCAL_URL}/${folder}/${file}`;
    return url;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filename);
  }
}
