import { Pool } from "mysql2";
import initialize from "../src/initialize";
import Inventory from "../src/model/Inventory";
import Product from "../src/model/Product";
import Database from "../src/DBClientLibrary/model/Database";
import { mock } from "jest-mock-extended";

describe("app init", () => {
  it("should initialize Upsertable", async () => {
    const dbInstance = new Database(mock<Pool>(), []);
    const inventory = await initialize(dbInstance, Inventory);
    const product = await initialize(dbInstance, Product);
    expect(inventory).toBeInstanceOf(Inventory);
    expect(product).toBeInstanceOf(Product);
  });
});
