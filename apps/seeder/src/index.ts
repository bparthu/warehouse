import { configMap } from "./config"
import { isSeedTypeValid } from "./validate"
import initialize from "./initialize"
import { AllowedInput } from "./interface"
import startStream from "./startStream"

const seed_type = process.argv[2]
if(!isSeedTypeValid(seed_type)) {
  console.error(`seed_type should be one of ${Object.keys(configMap)}`)
  process.exit(1)
} 

const {filePath, jsonPath, ClassRef } = configMap[seed_type as AllowedInput]

initialize(ClassRef)
.then(startStream(filePath, jsonPath))
