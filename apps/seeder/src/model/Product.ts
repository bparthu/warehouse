import { Upsertable, Rows, ProductRow } from "../interface";
import { Database, ResultSetHeader } from "@warehouse/dbclient";
import { createHash } from "crypto";

export default class Product implements Upsertable {
  dbInstance: Database;

  constructor(dbInstance: Database) {
    this.dbInstance = dbInstance;
  }

  async init(): Promise<Upsertable> {
    await this.dbInstance.execute("createTableProduct", []);
    await this.dbInstance.execute("createTableProductInventory", []);
    return this;
  }

  async upsert(row: ProductRow): Promise<Rows> {
    const conn = await this.dbInstance.getConnection()
    const id = createHash("md5")
      .update(row.name.toLocaleLowerCase())
      .digest("hex");
    const [upsertProductRows] = await this.dbInstance.execute("upsertProduct", [
      id,
      row.name,
    ], conn);
    const inputs = row.contain_articles.map((eachArticle) => {
      return [
        id,
        parseInt(eachArticle.art_id),
        parseInt(eachArticle.amount_of),
      ];
    });
    const [
      upsertProductInventoryRows,
    ] = await this.dbInstance.execute("upsertProductInventory", [inputs], conn);
    return upsertProductInventoryRows;
  }
}
