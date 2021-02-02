import { Pool } from "mysql2";
import Database from "../../src/DBClientLibrary/model/Database";
import initializeDBClient from "../../src/DBClientLibrary/client";
import { mock } from "jest-mock-extended";

jest.mock("mysql2", () => ({
  createPool: () => mock<Pool>(),
}));

jest.mock("../../src/DBClientLibrary/components/createQueryMap", () => ({
  createQueryMap: async () => Promise.resolve([{ file1: "content" }]),
}));

describe("initializeDBClient", () => {
  it("should return db instance", async () => {
    const actual = await initializeDBClient(
      {
        host: "localhost",
        user: "root",
        database: "test",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      },
      ""
    );
    expect(actual).toBeInstanceOf(Database);
    expect(actual.queryMap.length).toEqual(1);
    expect(actual.queryMap[0]).toStrictEqual({ file1: "content" });
  });
});
