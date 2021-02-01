import { Upsertable } from "../interface"

export default class Inventory implements Upsertable {
  upsert() {
    console.log("upserting inventory")
  }
}