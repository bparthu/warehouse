import { Database, PoolConnection, Pool } from "@warehouse/dbclient";
import { initializeApp } from "../src/initialize";
import Inventory from "../src/model/Inventory";
import Product from "../src/model/Product";
import { mock } from "jest-mock-extended";

describe("app init", () => {
  it("should initialize Upsertable", async () => {
    const dbInstance = new Database(mock<Pool>(), "");
    const inventory = await initializeApp(Inventory)(dbInstance);
    const product = await initializeApp(Product)(dbInstance);
    expect(inventory).toBeInstanceOf(Inventory);
    expect(product).toBeInstanceOf(Product);
  });
});
