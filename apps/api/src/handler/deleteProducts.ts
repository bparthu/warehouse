import { Request, Response, NextFunction } from "express";
import * as asyncHandler from "express-async-handler";
import { deleteProduct, isValidProduct } from "../domain/product";

const deleteProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId as string;
  // validation
  const isValid = await isValidProduct(productId);
  if (!isValid) {
    res.status(404).json({ message: "Product Not Found" });
    return next();
  }
  try {
    const data = await deleteProduct(productId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default asyncHandler(deleteProductsHandler);
