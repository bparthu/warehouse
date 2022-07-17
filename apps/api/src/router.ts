import { Router } from "express";
import { getProductsHandler, deleteProductsHandler } from "./handler";

const productRouter = Router();

productRouter.get("/api/v1/products", getProductsHandler);
productRouter.delete("/api/v1/products/:productId", deleteProductsHandler);

export default productRouter;
