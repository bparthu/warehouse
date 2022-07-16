import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { getProducts } from "../domain/product";

const getProductsHandler = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.json(products);
};

export default asyncHandler(getProductsHandler);
