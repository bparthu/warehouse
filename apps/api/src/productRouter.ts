import { Router } from "express"
import getProducts from "./handlers/getProducts"
import deleteProduct from "./handlers/deleteProduct"

const productRouter = Router()

productRouter.get("/v1/products", getProducts)
productRouter.delete("/v1/products/:id", deleteProduct)

export default productRouter
