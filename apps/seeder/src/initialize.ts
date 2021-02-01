import { ClassMap } from "./interface"
import Inventory from "./model/Inventory"
import Product from "./model/Product"

const initialize = (): Promise<ClassMap> => Promise.resolve({
  inventory: new Inventory(),
  products: new Product()
})

export default initialize