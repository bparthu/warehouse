import initialize from "../src/initialize"
import Inventory from "../src/model/Inventory"
import Product from "../src/model/Product"

describe("app init", () => {
  it("should return Promise<ClassMap>", async () => {
    const test = await initialize()
    expect(test.inventory).toBeInstanceOf(Inventory)
    expect(test.products).toBeInstanceOf(Product)
  })
})