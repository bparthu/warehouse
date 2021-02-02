import { parse } from "JSONStream";
import { mapSync, map } from "event-stream";
import { Upsertable } from "./interface";
import { createReadStream } from "fs";
import { resolve } from "path";

const startStream = (filePath: string, jsonPath: string) => (
  operator: Upsertable
) => {
  createReadStream(filePath)
    .pipe(parse(jsonPath))
    .pipe(
      map(async (row, callback) => {
        const result = await operator.upsert(row);
        callback(null, result);
      })
    )
    .on('error', function (err) {
      console.log(`Error while processing stream - ${err}`)
      operator.dbInstance.closeConnection()
    })
    .on('end', function () {
      console.log("all records processed")
      operator.dbInstance.closeConnection()
    });
};

export default startStream;
