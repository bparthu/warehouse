import { promises as fs } from "fs";
import { createHash } from "crypto";

const getRawData = async <T>(
  seederPath: string,
  fileType: string
): Promise<T> => {
  // read json file from filesystem
  const data = await fs.readFile(`${seederPath}/${fileType}.json`, "utf-8");
  return JSON.parse(data) as T;
};

const getHash = (text: string) => createHash("md5").update(text).digest("hex");

export { getRawData, getHash };
