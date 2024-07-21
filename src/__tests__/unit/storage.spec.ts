import { localStorage } from "@/lib/storage";

describe("Storage", () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("should set and get item", async () => {
    await localStorage.setItem("test", "value");
    const value = await localStorage.getItem("test");
    expect(value).toBe("value");
  });

  it("should set and get item sync", () => {
    localStorage.setItemSync("test", "value");
    const value = localStorage.getItemSync("test");
    expect(value).toBe("value");
  });

  it("should return undefined for non-existing key", async () => {
    const value = await localStorage.getItem("non-existing-key");
    expect(value).toBeUndefined();
  });

  it("should return undefined for non-existing key sync", () => {
    const value = localStorage.getItemSync("non-existing-key");
    expect(value).toBeUndefined();
  });

  it("should return false for error", async () => {
    const value = await localStorage.setItem("error", BigInt(123456));
    expect(value).toBe(false);
  });

  it("should return false for error sync", () => {
    const value = localStorage.setItemSync("error", BigInt(123456));
    expect(value).toBe(false);
  });

  it("should return undefined for error", async () => {
    const value = await localStorage.getItem("test");
    expect(value).toBeUndefined();
  });

  it("should return undefined for error sync", () => {
    const value = localStorage.getItemSync("test");
    expect(value).toBeUndefined();
  });
});
