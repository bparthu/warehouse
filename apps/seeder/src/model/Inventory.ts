import { Upsertable } from "../interface";
import { Database } from "@warehouse/dbclient";

export default class Inventory implements Upsertable {
  dbInstance: Database;

  constructor(dbInstance: Database) {
    this.dbInstance = dbInstance;
  }

  upsert() {
    console.log("upserting inventory");
  }
}
