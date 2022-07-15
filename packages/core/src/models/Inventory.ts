import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'
import Product from "./Product"
import ProductInventory from "./ProductInventory"

@Table
class Inventory extends Model {
  @Column({primaryKey: true})
  id: number

  @Column
  name: string

  @Column
  stock: number

  @BelongsToMany(() => Product, () => ProductInventory)
  products: Product[]

}

export default Inventory