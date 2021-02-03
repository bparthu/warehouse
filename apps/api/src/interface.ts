import { Request } from "express"
import { PoolConnection } from "@warehouse/dbclient"
import Product from "./model/Product"

export type ServiceConfig = {
  port: number
}

export interface RequestExtended extends Request {
  dbConn?: PoolConnection
  product?: Product
}

export interface ProductResponseModel {
  id: string,
  name: string
}

export interface StockAvailibility {
  newStock: number | null
}