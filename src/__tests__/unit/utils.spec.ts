import { getValidColor, isValidColor } from "@/lib/utils";

describe("utils/colors", () => {
  it("isValidColor", () => {
    expect(isValidColor(undefined)).toBe(false);
    expect(isValidColor("#000")).toBe(true);
    expect(isValidColor("white")).toBe(true);
    expect(isValidColor("rgb(0,0,0)")).toBe(true);
    expect(isValidColor("nikos")).toBe(false);
    expect(isValidColor("false")).toBe(false);
  });

  it("getValidColor", () => {
    expect(getValidColor(undefined)).toBe("");
    expect(getValidColor("#000")).toBe("#000");
    expect(getValidColor("white")).toBe("white");
    expect(getValidColor("rgb(0,0,0)")).toBe("rgb(0,0,0)");
    expect(getValidColor("nikolakis")).toBe("");
  });
});
