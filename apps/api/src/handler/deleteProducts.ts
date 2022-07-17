import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { deleteProduct } from "../domain/product";

const deleteProductsHandler = async (req: Request, res: Response) => {
  const productId = req.params.productId as string
  const data = await deleteProduct(productId)
  res.json(data);
};

export default asyncHandler(deleteProductsHandler);
