import {
  Inventory,
  Product,
  ProductInventory,
  Sequelize,
} from "@warehouse/core";
import { InventorySeed, ProductSeed } from "../interface";
import { getRawData, getHash } from "../helper";

const seedInventory = async (seederPath: string) => {
  // get inventoryRawData
  const rawData = await getRawData<InventorySeed>(seederPath, "inventory");
  // map and prepare data to write to db
  const records = rawData.inventory.map((item) => ({
    id: parseInt(item.art_id),
    name: item.name,
    stock: parseInt(item.stock),
  }));
  const inventories = await Inventory.bulkCreate(records, {
    updateOnDuplicate: ["name", "stock"],
  });
  return await Promise.all(inventories.map((inventory) => inventory.save()));
};

const seedProduct = async (seederPath: string) => {
  // get ProductRawData
  const rawData = await getRawData<ProductSeed>(seederPath, "products");
  // map and prepare data to write to db
  const records = rawData.products.map((item) => ({
    id: getHash(item.name),
    name: item.name,
  }));
  const products = await Product.bulkCreate(records, {
    updateOnDuplicate: ["name"],
  });
  return await Promise.all(products.map((product) => product.save()));
};

const seedProductInventory = async (seederPath: string) => {
  // get ProductRawData
  const rawData = await getRawData<ProductSeed>(seederPath, "products");
  // map and prepare data to write to db
  const records = rawData.products
    .map((productItem) =>
      productItem.contain_articles.map(
        ({ art_id: inventoryId, amount_of: amountOf }) => ({
          inventoryId,
          productId: getHash(productItem.name),
          amountOf,
        })
      )
    )
    .flat(2);

  const productinventories = await ProductInventory.bulkCreate(records, {
    updateOnDuplicate: ["amountOf"],
  });
  return await Promise.all(productinventories.map((pi) => pi.save()));
};

const startSeeding = (seederPath: string) => async (conn: Sequelize) => {
  const inventories = await seedInventory(seederPath);
  const products = await seedProduct(seederPath);
  const productinventories = await seedProductInventory(seederPath);
  return {
    inventoriesCount: inventories.length,
    productsCount: products.length,
    productinventoriesCount: productinventories.length,
    conn,
  };
};

export { startSeeding };
