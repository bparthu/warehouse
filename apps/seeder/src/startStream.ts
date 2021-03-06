import { parse } from "JSONStream";
import { mapSync, map } from "event-stream";
import { Upsertable, Rows } from "./interface";
import { createReadStream } from "fs";
import { resolve } from "path";

const startStream = (filePath: string, jsonPath: string) => (
  operator: Upsertable
) => {
  createReadStream(filePath)
    .pipe(parse(jsonPath))
    .pipe(
      map(async (row, callback) => {
        try {
          const result = await operator.upsert(row);
          callback(null, result);
        } catch (err) {
          callback(err, null);
        }
      })
    )
    .on("error", function (err) {
      console.log(`Error while processing stream - ${err}`);
      operator.dbInstance.closeConnectionPool();
    })
    .on("end", function () {
      console.log("all records processed");
      operator.dbInstance.closeConnectionPool();
    });
};

export default startStream;
