import { Inventory, Product, ProductInventory } from "../models";

const syncTables = async (force = false, alter = false) => {
  // synchronize table
  await Inventory.sync({ force, alter });
  await Product.sync({ force, alter });
  await ProductInventory.sync({ force, alter });
  return {
    Inventory,
    Product,
    ProductInventory,
  };
};

const Meta = {
  syncTables,
};

export default Meta;
