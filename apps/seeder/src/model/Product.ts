import { Upsertable, Rows, ProductRow } from "../interface";
import { Database, PoolConnection } from "@warehouse/dbclient";
import { createHash } from "crypto";

export default class Product implements Upsertable {
  dbInstance: Database;
  conn: PoolConnection;

  constructor(dbInstance: Database, conn: PoolConnection) {
    this.dbInstance = dbInstance;
    this.conn = conn;
  }

  async initTable(): Promise<void> {
    await this.dbInstance.execute("createTableProduct", [], this.conn);
    await this.dbInstance.execute("createTableProductInventory", [], this.conn);
  }

  async upsert(row: ProductRow): Promise<Rows> {
    const id = createHash("md5")
      .update(row.name.toLocaleLowerCase())
      .digest("hex");
    const [upsertProductRows] = await this.dbInstance.execute(
      "upsertProduct",
      [id, row.name],
      this.conn
    );
    const inputs = row.contain_articles.map((eachArticle) => {
      return [
        id,
        parseInt(eachArticle.art_id),
        parseInt(eachArticle.amount_of),
      ];
    });
    const [upsertProductInventoryRows] = await this.dbInstance.execute(
      "upsertProductInventory",
      [inputs],
      this.conn
    );
    return upsertProductInventoryRows;
  }
}
