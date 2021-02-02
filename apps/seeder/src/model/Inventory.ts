import { Upsertable, Rows, InventoryRow } from "../interface";
import { Database } from "@warehouse/dbclient";

export default class Inventory implements Upsertable {
  dbInstance: Database;

  constructor(dbInstance: Database) {
    this.dbInstance = dbInstance;
  }

  async init(): Promise<Upsertable> {
    const [rows] = await this.dbInstance.execute("createTableInventory", [])
    return this
  }

  async upsert(row: InventoryRow): Promise<Rows> {
    console.log("upserting inventory");
    const [rows] = await this.dbInstance.execute("upsertInventory", [parseInt(row.art_id), row.name, parseInt(row.stock)])
    return rows
  }
}
