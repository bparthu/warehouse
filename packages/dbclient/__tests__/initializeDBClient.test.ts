import { Pool } from "mysql2/promise";
import Database from "../src/components/model/Database";
import initializeDBClient from "../src/components/initializeDBClient";
import { mock } from "jest-mock-extended";
import { DBConfig } from "../src/components/interface";

jest.mock("mysql2/promise", () => ({
  createPool: () => mock<Pool>(),
}));

jest.mock("../src/components/createQueryMap", () => ({
  createQueryMap: async () => Promise.resolve([{ file1: "content" }]),
}));

describe("initializeDBClient", () => {
  it("should return db instance", async () => {
    const dbConfig: DBConfig = {
      connPoolOptions: {
        host: "localhost",
        user: "root",
        database: "test",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      },
      sqlFilesPath: "",
    };
    const actual = await initializeDBClient(dbConfig);
    expect(actual).toBeInstanceOf(Database);
    expect(actual.queryMap.length).toEqual(1);
    expect(actual.queryMap[0]).toStrictEqual({ file1: "content" });
  });
});
