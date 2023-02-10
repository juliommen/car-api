import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../utils/uploadFile";
import { StorageInterface } from "../../StorageInterface";

export class Storage implements StorageInterface {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: "us-east-1",
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const ContentType = mime.getType(originalName);
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();
    await fs.promises.unlink(originalName);
    const url = `${process.env.AWS_BUCKET_URL}/${folder}/${file}`;
    return url;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
