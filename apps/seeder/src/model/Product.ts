import { Upsertable } from "../interface";
import Database from "../DBClientLibrary/model/Database";

export default class Product implements Upsertable {
  dbInstance: Database;

  constructor(dbInstance: Database) {
    this.dbInstance = dbInstance;
  }

  upsert() {
    console.log("upserting product");
  }
}
