import { createQueryMap } from "../src/components/createQueryMap";

jest.mock("fs", () => ({
  readFileSync: () => "some query statements",
  promises: {
    readdir: async () => Promise.resolve(["file1", "file2"]),
  },
}));

describe("createQueryMap", () => {
  it("should load sql queries into memory", async () => {
    const actual = await createQueryMap("");
    const expected = {
      file1: "some query statements",
      file2: "some query statements",
    };
    expect(actual).toStrictEqual(expected);
  });
});
