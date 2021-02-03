import { initializeDBClient } from "@warehouse/dbclient"
import { dbConfig, serviceConfig } from "./config"
import { setupGracefulExit } from "./ProcessExit"
import { createApp } from "./app"

initializeDBClient(dbConfig)
.then((dbInstance) => {
  setupGracefulExit()
  createApp(dbInstance).listen(serviceConfig.port, () => {
    console.log(`API server listening in port - ${serviceConfig.port}`)
  })
})