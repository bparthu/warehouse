import { Sequelize } from "sequelize-typescript";
import { WarehouseConnectOptions } from "./interface";
import { Inventory, Product, ProductInventory } from "./models";
import { Meta } from "./domain";

const connectToDB = async (options: WarehouseConnectOptions) => {
  // create sequalize instance with db connection config
  const sequelize = new Sequelize({
    ...options,
    dialect: "mysql",
    models: [Inventory, Product, ProductInventory],
  });
  // establish db connection
  await sequelize.authenticate();
  return Meta;
};

export { connectToDB };
export { Inventory, Product, ProductInventory };
export { WarehouseConnectOptions };
