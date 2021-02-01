import { parse } from "JSONStream"
import { mapSync } from "event-stream"
import { ClassMap} from "./interface"
import { createReadStream } from "fs"

const startStream = (filePath: string, jsonPath: string) => (entity: ClassMap) => {
  createReadStream(filePath)
  .pipe(parse(jsonPath))
  .pipe(mapSync((row) => {
    console.log(row)
    return row
  }))
}

export default startStream