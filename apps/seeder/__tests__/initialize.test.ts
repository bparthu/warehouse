import initialize from "../src/initialize"
import Inventory from "../src/model/Inventory"
import Product from "../src/model/Product"
import { Upsertable } from "../src/interface"

describe("app init", () => {
  it("should initialize Upsertable", async () => {
    const inventory = await initialize(Inventory)
    const product = await initialize(Product)
    expect(inventory).toBeInstanceOf(Inventory)
    expect(product).toBeInstanceOf(Product)
  })
})