import { Product, Inventory, Op, getConnection } from "@warehouse/core";

const isProductAvailable = (products: Product) =>
  Math.min(
    ...products.inventories.map(
      (inventory) =>
        inventory.stock -
        inventory.getDataValue("ProductInventory").getDataValue("amountOf")
    )
  ) >= 0;

const getProducts = async () => {
  const products = await Product.findAll({
    include: [Inventory],
  });
  const productCount = products.map((product) => {
    const name = product.getDataValue("name");
    const id = product.getDataValue("id");
    const stock = Math.min(
      ...product.inventories.map((inventory) => {
        return Math.floor(
          inventory.getDataValue("stock") /
            inventory.getDataValue("ProductInventory").getDataValue("amountOf")
        );
      })
    );
    return { name, stock, id };
  });
  return productCount;
};

const deleteProduct = async (productId: string) => {
  const conn = getConnection();
  const t = await conn.transaction();
  try {
    // check if product is available is delete
    const product = await Product.findOne({
      include: [Inventory],
      where: {
        id: productId,
      },
    });
    const available = isProductAvailable(product);
    if (!available) {
      throw new Error("ProductNotAvailable");
    }
    // const inventoryIds = product.inventories.map((inventory) => (inventory.id))
    // const inventories = await Inventory.findAll({
    //   include: [Product],
    //   where: {
    //     id: { [Op.in]: inventoryIds }
    //   }
    // })

    const prepareInventoriesToUpdate = product.inventories.map((inventory) => ({
      inventoryId: inventory.id,
      currentStocks: inventory.stock,
      numStocksToReduce: inventory
        .getDataValue("ProductInventory")
        .getDataValue("amountOf") as number,
    }));

    await Promise.all(
      prepareInventoriesToUpdate.map((lookupData) => {
        return Inventory.update(
          {
            stock: lookupData.currentStocks - lookupData.numStocksToReduce,
          },
          {
            where: {
              id: lookupData.inventoryId,
            },
          }
        );
      })
    );
    await t.commit();
    return prepareInventoriesToUpdate;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export { getProducts, deleteProduct };
