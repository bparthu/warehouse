import {seed_file_map } from "./config"
import { isSeedTypeValid } from "./validate"
import initialize from "./initialize"
import { AllowedInput } from "./interface"
import startStream from "./startStream"

const seed_type = process.argv[2]
if(!isSeedTypeValid(seed_type)) {
  console.error(`seed_type should be one of ${Object.keys(seed_file_map)}`)
  process.exit(1)
} 

const {filePath, jsonPath} = seed_file_map[seed_type as AllowedInput]

initialize()
.then(startStream(filePath, jsonPath))


  