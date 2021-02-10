import { PoolConnection, Database, Pool } from "@warehouse/dbclient"
import { dbConfig } from "../config"
import { ProductResponseModel, StockAvailibility } from "../interface"

export default class Product {
  dbInstance: Database

  constructor(dbInstance: Database) {
    this.dbInstance = dbInstance
  }

  async getProducts(): Promise<ProductResponseModel> {
    const [row] = await this.dbInstance.execute("getProducts", [])
    return (row as any) as ProductResponseModel
  }

  async sellProduct(id: string) {
    let success = false
    // get connection to start transaction
    const conn = await this.dbInstance.getConnection()
    // check if the product exist
    try {
      // start transaction
      await conn.beginTransaction()
      // exclusive lock on required inventory rows
      await this.dbInstance.execute("lockInventoryRows", [id], conn)
      // is product available ?
      const [row] = ((await this.dbInstance.execute("isProductAvailable", [id], conn)) as any) as [StockAvailibility[]]
      if(row[0].newStock >= 0) {
        // sell product
        await this.dbInstance.execute("sellProduct", [id], conn)
        // commit transaction
        await conn.commit()
        success = true
      } else {
        // rollback transaction
        await conn.rollback()
        console.log({
          message: "Requested product stock unavailable / invalid product id",
          context: {
            newStock: row[0].newStock
          }
        })
      }
    } catch(err) {
      // TODO: throw managed http error
      throw err
    } finally {
      // Very important - release connection
      conn.release()
    }
    return success
  }
}