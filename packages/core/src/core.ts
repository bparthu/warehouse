import { Sequelize } from 'sequelize-typescript'
import { WarehouseConnectOptions } from "./interface"
import { Inventory, Product, ProductInventory } from "./models"

const warehouse = {
  connect: async (options: WarehouseConnectOptions) => {
    // create sequalize instance with db connection config
    const sequelize= new Sequelize({
      ...options,
      dialect: "mysql",
      models: [Inventory, Product, ProductInventory]
    })
    
    try {
      // establish db connection
      await sequelize.authenticate()
    } catch(err) {
      console.log("connection failed", err)
    }
  }
}