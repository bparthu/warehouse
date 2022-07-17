import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { deleteProduct } from "../domain/product";

const deleteProductsHandler = async (req: Request, res: Response) => {
  const productId = req.params.productId as string;
  try {
    const data = await deleteProduct(productId);
    res.json(data);
  } catch (err) {
    console.log("see here", err);
    switch (err.message) {
      case "ProductNotAvailable":
        res.status(404).json({ message: "Product Not Available" });
      default:
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default asyncHandler(deleteProductsHandler);
