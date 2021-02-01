import { parse } from "JSONStream";
import { mapSync, map } from "event-stream";
import { Upsertable } from "./interface";
import { createReadStream } from "fs";
import { resolve } from "path";

const startStream = (filePath: string, jsonPath: string) => (
  operator: Upsertable
) => {
  operator.upsert();
  createReadStream(filePath)
    .pipe(parse(jsonPath))
    .pipe(
      map(async (row, callback) => {
        const test = await Promise.resolve(row);
        callback(null, test);
      })
    )
    .pipe(mapSync(console.log));
};

export default startStream;
