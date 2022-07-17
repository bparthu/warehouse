import { Product, Inventory, Op, getConnection } from "@warehouse/core";

const isProductAvailable = (products: Product) =>
  Math.min(
    ...products.inventories.map(
      (inventory) =>
        inventory.stock -
        inventory.getDataValue("ProductInventory").getDataValue("amountOf")
    )
  ) >= 0;

const getProductDetails = (product: Product) => {
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
};

const getProduct = async (productId: string) => {
  const product = await Product.findOne({
    include: [Inventory],
    where: {
      id: productId,
    },
  });
  return getProductDetails(product);
};

const getProducts = async () => {
  const products = await Product.findAll({
    include: [Inventory],
  });
  const productCount = products.map(getProductDetails);
  return productCount;
};

const deleteProduct = async (productId: string) => {
  const conn = getConnection();
  const result = await conn.transaction(async (t) => {
    // check if product is available is delete
    const product = await Product.findOne({
      transaction: t,
      lock: t.LOCK.UPDATE,
      include: [Inventory],
      where: {
        id: productId,
      },
    });
    const available = isProductAvailable(product);
    if (!available) {
      return;
    }

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
            transaction: t,
            where: {
              id: lookupData.inventoryId,
            },
          }
        );
      })
    );

    return;
  });

  const updatedProduct = await getProduct(productId);
  return updatedProduct;
};

export { getProducts, deleteProduct };
