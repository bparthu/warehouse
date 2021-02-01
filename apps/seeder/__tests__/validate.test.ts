import { isSeedTypeValid } from "../src/validate";

describe("CLI input validation", () => {
  it("return true, when input is of valid type", () => {
    expect(isSeedTypeValid("inventory")).toBe(true);
    expect(isSeedTypeValid("products")).toBe(true);
  });

  it("return false, when input is of invalid type", () => {
    expect(isSeedTypeValid()).toBe(false);
    expect(isSeedTypeValid(null)).toBe(false);
    expect(isSeedTypeValid("invalid")).toBe(false);
  });
});
