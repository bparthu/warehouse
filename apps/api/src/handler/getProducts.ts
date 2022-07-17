import { Request, Response, NextFunction } from "express";
import * as asyncHandler from "express-async-handler";
import { getProducts } from "../domain/product";

const getProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default asyncHandler(getProductsHandler);
