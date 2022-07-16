import { Op } from "sequelize"
import { Sequelize } from "sequelize-typescript";
import { WarehouseConnectOptions } from "./interface";
import { Inventory, Product, ProductInventory } from "./models";
import { getConnection, setConnection } from "./utils/helper"

const connectToDB = async (options: WarehouseConnectOptions) => {
  // create sequalize instance with db connection config
  const sequelize = new Sequelize({
    ...options,
    dialect: "mysql",
    models: [Inventory, Product, ProductInventory],
  });
  // establish db connection
  await sequelize.authenticate();
  return setConnection(sequelize)
};

const syncTables = (force = false, alter=false) => async (conn: Sequelize) => {
  // synchronize table
  await Inventory.sync({ force, alter });
  await Product.sync({ force, alter });
  await ProductInventory.sync({ force, alter });
  try{
    await conn.getQueryInterface().addConstraint("Inventories", {
      type: "check",
      fields: ["stock"],
      where: {
        stock: { [Op.gte]: 0 }
      }
    })
  } catch(err) {
    console.log("CHECK constraint exists already, ignoring")
  }
  return conn;
};

export { connectToDB, syncTables, getConnection };
export { Inventory, Product, ProductInventory, Sequelize };
export { WarehouseConnectOptions };
