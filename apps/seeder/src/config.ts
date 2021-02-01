import Inventory from "./model/Inventory"
import Product from "./model/Product"
import { ConfigMap } from "./interface"

const seed_file_map: ConfigMap = {
  inventory: {
    filePath: `${process.cwd()}/seed_files/inventory.json`,
    jsonPath: "inventory.*"
  },
  products: {
    filePath: `${process.cwd()}/seed_files/products.json`,
    jsonPath: "products.*"
  }
}

export { seed_file_map }