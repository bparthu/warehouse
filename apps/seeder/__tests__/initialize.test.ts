import { Database, Pool } from "@warehouse/dbclient";
import initialize from "../src/initialize";
import Inventory from "../src/model/Inventory";
import Product from "../src/model/Product";
import { mock } from "jest-mock-extended";

describe("app init", () => {
  it("should initialize Upsertable", async () => {
    const dbInstance = mock<Database>()
    const inventory = await initialize(dbInstance, Inventory);
    const product = await initialize(dbInstance, Product);
    expect(inventory).toBeInstanceOf(Inventory);
    expect(product).toBeInstanceOf(Product);
  });
});
