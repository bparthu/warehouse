import { Upsertable } from "../interface";

export default class Product implements Upsertable {
  upsert() {
    console.log("upserting product");
  }
}
