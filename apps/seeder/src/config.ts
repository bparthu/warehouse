import { DBConfig } from "@warehouse/dbclient";
import Inventory from "./model/Inventory";
import Product from "./model/Product";
import { ConfigMap } from "./interface";

/*
 Optimizations - Extract connection configs from env vars / secrets
 for the demo purpose, i am leaving the configs as is
*/
const dbConfig: DBConfig = {
  connPoolOptions: {
    host: "localhost",
    user: "root",
    password: "mysql-pw",
    database: "warehouse",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
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
