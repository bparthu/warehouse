import { configMap, dbConfig } from "./config"
import { isSeedTypeValid } from "./validate"
import initialize from "./initialize"
import { AllowedInput } from "./interface"
import startStream from "./startStream"
import { createQueryMap } from "./DBClientLibrary/client"

const seed_type = process.argv[2]
if(!isSeedTypeValid(seed_type)) {
  console.error(`seed_type should be one of ${Object.keys(configMap)}`)
  process.exit(1)
} 

const {filePath, jsonPath, ClassRef } = configMap[seed_type as AllowedInput]

// initializeDBClient(connectionOptions, sqlPath)
// .then((dbClient) => (initialize(dbClient, ClassRef)))
// .then(startStream(filePath, jsonPath))

createQueryMap(dbConfig.sqlFilesPath).then(console.log)

initialize(ClassRef)
.then(startStream(filePath, jsonPath))
