import fs from "fs";

export async function deleteFile(path: string) {
  try {
    await fs.promises.stat(path);
  } catch (error) {
    return;
  }
  await fs.promises.unlink(path);
}
