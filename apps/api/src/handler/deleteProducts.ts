import { Request, Response, NextFunction } from "express";
import * as asyncHandler from "express-async-handler";
import { deleteProduct } from "../domain/product";

const deleteProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId as string;
  try {
    const data = await deleteProduct(productId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default asyncHandler(deleteProductsHandler);
