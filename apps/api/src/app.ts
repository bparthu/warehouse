import * as express from "express"
import { Database } from "@warehouse/dbclient"
import productRouter from "./productRouter"
import contextMiddleware from "./middlewares/contextMiddleware"

export function createApp(dbInstance: Database) {
  const app = express()
  app.use(contextMiddleware(dbInstance))
  app.use(productRouter)
  return app
}