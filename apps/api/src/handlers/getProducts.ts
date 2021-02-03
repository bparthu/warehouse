import {Request, Response, NextFunction} from "express"
import * as asyncHandler from "express-async-handler"
import { RequestExtended } from "../interface"

const getProducts = async (req: RequestExtended, res: Response, next: NextFunction) => {
  const product = req.product
  const productList = await product.getProducts()
  res.json(productList)
}

export default asyncHandler(getProducts)