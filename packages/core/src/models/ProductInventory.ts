import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Inventory from "./Inventory";
import Product from "./Product";

@Table({
  indexes: [
    {
      fields: ["inventoryId", "productId"],
      unique: true,
    },
  ],
})
class ProductInventory extends Model {
  @ForeignKey(() => Inventory)
  @Column
  inventoryId: number;

  @ForeignKey(() => Product)
  @Column
  productId: string;

  @Column
  amountOf: number;
}

export default ProductInventory;
