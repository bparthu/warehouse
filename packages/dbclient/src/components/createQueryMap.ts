import { promises as fsp, readFileSync } from "fs";
import { parse, join } from "path";

// load sql scripts into memory during app startup
const createQueryMap = async (sqlFilesPath: string) => {
  const files = await fsp.readdir(sqlFilesPath);
  return files.reduce((acc, file) => {
    acc[parse(file).name] = readFileSync(join(sqlFilesPath, file), "utf-8");
    return acc;
  }, {});
};

export { createQueryMap };
