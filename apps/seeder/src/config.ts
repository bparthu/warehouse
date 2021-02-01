import Inventory from "./model/Inventory";
import Product from "./model/Product";
import { ConfigMap, DBConfig } from "./interface";

const dbConfig: DBConfig = {
  sqlFilesPath: `${__dirname}/sql/`,
};

const configMap: ConfigMap = {
  inventory: {
    filePath: `${process.cwd()}/seed_files/inventory.json`,
    jsonPath: "inventory.*",
    ClassRef: Inventory,
  },
  products: {
    filePath: `${process.cwd()}/seed_files/products.json`,
    jsonPath: "products.*",
    ClassRef: Product,
  },
};

export { configMap, dbConfig };
