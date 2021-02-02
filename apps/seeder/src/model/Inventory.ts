import { Upsertable, Rows, InventoryRow } from "../interface";
import { Database, PoolConnection } from "@warehouse/dbclient";

export default class Inventory implements Upsertable {
  dbInstance: Database;
  conn: PoolConnection;

  constructor(dbInstance: Database, conn: PoolConnection) {
    this.dbInstance = dbInstance;
    this.conn = conn;
  }

  async initTable(): Promise<void> {
    await this.dbInstance.execute("createTableInventory", [], this.conn);
  }

  async upsert(row: InventoryRow): Promise<Rows> {
    const [rows] = await this.dbInstance.execute(
      "upsertInventory",
      [parseInt(row.art_id), row.name, parseInt(row.stock)],
      this.conn
    );
    return rows;
  }
}
