import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'
import Inventory from "./Inventory"
import ProductInventory from "./ProductInventory"

@Table
class Product extends Model {
  @Column({primaryKey: true})
  id: string

  @Column
  name: string

  @BelongsToMany(() => Inventory, () => ProductInventory)
  inventories: Inventory[]
}

export default Product