import { Upsertable } from "../interface";
import Database from "../DBClientLibrary/model/Database";

export default class Inventory implements Upsertable {
  dbInstance: Database;

  constructor(dbInstance: Database) {
    this.dbInstance = dbInstance;
  }

  upsert() {
    console.log("upserting inventory");
  }
}
