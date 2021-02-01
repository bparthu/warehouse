import * as es from "event-stream"
import * as JSONStream from "JSONStream"
import {seed_file_map } from "./config"
import { isSeedTypeValid } from "./validate"
import { createReadStream } from "fs"

const seed_type = process.argv[2]
if(!isSeedTypeValid(seed_type)) {
  console.error(`seed_type should be one of ${Object.keys(seed_file_map)}`)
  process.exit(1)
} else {
  const filePath = seed_file_map[seed_type]
  const seederStream = createReadStream(filePath)
  seederStream
  .pipe(JSONStream.parse("inventory.*"))
  .pipe(es.mapSync((row) => {
    return {type: seed_type, row}
  }))
  .pipe(es.mapSync((row) => {
    console.log(row)
    return row
  }))
}