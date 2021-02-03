import {Request, Response, NextFunction} from "express"
import * as asyncHandler from "express-async-handler"
import { RequestExtended } from "../interface"

const deleteProduct = async (req: RequestExtended, res: Response, next: NextFunction) => {
  const product = req.product
  const result: boolean = await product.sellProduct(req.params.id)
  res.json({success: result})
}

export default asyncHandler(deleteProduct)