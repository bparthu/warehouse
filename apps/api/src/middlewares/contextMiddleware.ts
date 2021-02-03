import { Database } from "@warehouse/dbclient"
import { RequestHandler, Request, Response, NextFunction } from "express"
import * as asyncHandler from "express-async-handler"
import { RequestExtended } from "../interface"
import Product from "../model/Product"
import { dbConfig } from "../config"

const contextMiddleware = (dbInstance: Database): RequestHandler => {
  return asyncHandler(
    async (req: RequestExtended, res: Response, next: NextFunction) => {
      req.product = new Product(dbInstance)
      next()
    }
  )
}

export default contextMiddleware