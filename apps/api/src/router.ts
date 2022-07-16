import { Router } from "express";
import getProductsHandler from "./handler/getProducts";

const productRouter = Router();

productRouter.get("/v1/products", getProductsHandler);

export default productRouter;
