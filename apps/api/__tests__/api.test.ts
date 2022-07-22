import * as request from "supertest";
import { Express } from "express";
import { createHash } from "crypto";
import {
  connectToDB,
  Inventory,
  Op,
  Product,
  ProductInventory,
  Sequelize,
} from "@warehouse/core";
import createApp from "../src/app";

const getHash = (text: string) => createHash("md5").update(text).digest("hex");

describe("api", () => {
  let app: Express;
  let dbConnection: Sequelize;

  beforeAll(async () => {
    // connect to db
    dbConnection = await connectToDB({
      database: "warehouse",
      username: "app-user",
      password: "app-pw",
    });
    // setup test data
    await Inventory.bulkCreate([
      { id: 10000, name: "test item 1", stock: 100 },
      { id: 10001, name: "test item 2", stock: 100 },
      { id: 10002, name: "test item 3", stock: 100 },
    ]);
    await Product.bulkCreate([
      { id: getHash("test product 1"), name: "test product 1" },
      { id: getHash("test product 2"), name: "test product 2" },
      { id: getHash("test product 3"), name: "test product 3" },
    ]);

    await ProductInventory.bulkCreate([
      {
        id: 10000,
        inventoryId: 10000,
        productId: getHash("test product 1"),
        amountOf: 1,
      },
      {
        id: 10001,
        inventoryId: 10001,
        productId: getHash("test product 1"),
        amountOf: 1,
      },
      {
        id: 10002,
        inventoryId: 10002,
        productId: getHash("test product 1"),
        amountOf: 1,
      },
      {
        id: 10003,
        inventoryId: 10000,
        productId: getHash("test product 2"),
        amountOf: 1,
      },
      {
        id: 10004,
        inventoryId: 10001,
        productId: getHash("test product 2"),
        amountOf: 1,
      },
      {
        id: 10005,
        inventoryId: 10002,
        productId: getHash("test product 2"),
        amountOf: 1,
      },
      {
        id: 10006,
        inventoryId: 10000,
        productId: getHash("test product 3"),
        amountOf: 1,
      },
      {
        id: 10007,
        inventoryId: 10001,
        productId: getHash("test product 3"),
        amountOf: 1,
      },
      {
        id: 10008,
        inventoryId: 10002,
        productId: getHash("test product 3"),
        amountOf: 1,
      },
    ]);
    app = await createApp()(dbConnection);
    return;
  });

  it("Should show correct stock quantity for test products", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(
      (
        response.body as Array<{ id: number; name: string; stock: number }>
      ).filter((product) => product.name === "test product 1")[0].stock
    ).toEqual(100);
    expect(
      (
        response.body as Array<{ id: number; name: string; stock: number }>
      ).filter((product) => product.name === "test product 2")[0].stock
    ).toEqual(100);
    expect(
      (
        response.body as Array<{ id: number; name: string; stock: number }>
      ).filter((product) => product.name === "test product 3")[0].stock
    ).toEqual(100);
    return;
  });

  it("Should delete product", async () => {
    const parallelRequests: request.Test[] = [];
    for (let i = 0; i < 100; i++) {
      parallelRequests.push(
        request(app).delete(`/api/v1/products/${getHash("test product 1")}`)
      );
      parallelRequests.push(
        request(app).delete(`/api/v1/products/${getHash("test product 2")}`)
      );
      parallelRequests.push(
        request(app).delete(`/api/v1/products/${getHash("test product 3")}`)
      );
    }
    await Promise.all(parallelRequests);

    const response = await request(app).get("/api/v1/products");
    expect(
      (
        response.body as Array<{ id: number; name: string; stock: number }>
      ).filter((product) => product.name === "test product 1")[0].stock
    ).toEqual(0);
    expect(
      (
        response.body as Array<{ id: number; name: string; stock: number }>
      ).filter((product) => product.name === "test product 2")[0].stock
    ).toEqual(0);
    expect(
      (
        response.body as Array<{ id: number; name: string; stock: number }>
      ).filter((product) => product.name === "test product 3")[0].stock
    ).toEqual(0);
    return;
  });

  afterAll(async () => {
    // cleanup test data
    await Inventory.destroy({
      where: {
        id: { [Op.in]: [10000, 10001, 10002] },
      },
    });
    await Product.destroy({
      where: {
        id: {
          [Op.in]: [
            getHash("test product 1"),
            getHash("test product 2"),
            getHash("test product 3"),
          ],
        },
      },
    });
    await ProductInventory.destroy({
      where: {
        id: {
          [Op.in]: [
            10000, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008,
          ],
        },
      },
    });
    // close db connection
    await dbConnection.close();
    return;
  });
});
