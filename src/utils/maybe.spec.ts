import { Maybe } from "../../dist";

describe("Maybe", () => {
  describe("use", () => {
    it("should throw err, undefined", () => {
      expect(() => new Maybe(undefined).use()).toThrowError();
    });

    it("should throw err, null", () => {
      expect(() => new Maybe(null).use()).toThrowError();
    });

    it("should return the value", () => {
      expect(new Maybe("foo").use()).toBe("foo");
    });

    it("should return the value, even tho its falsy", () => {
      expect(new Maybe("").use()).toBe("");
    });
  });

  describe("exists", () => {
    it("should return false, undefined", () => {
      expect(new Maybe(undefined).exists()).toBe(false);
    });

    it("should return false, null", () => {
      expect(new Maybe(null).exists()).toBe(false);
    });

    it("should return true, exists", () => {
      expect(new Maybe("ye").exists()).toBe(true);
    });

    it("should return true, falsy", () => {
      expect(new Maybe(0).exists()).toBe(true);
    });
  });

  describe("or", () => {
    it("should return the value, undefined", () => {
      expect(new Maybe<string>(undefined).or(() => "hi")).toBe("hi");
    });

    it("should return the value, null", () => {
      expect(new Maybe<string>(null).or(() => "hi")).toBe("hi");
    });

    it("should original, exists", () => {
      expect(new Maybe("ye").or(() => "ye1")).toBe("ye");
    });

    it("should return true, falsy", () => {
      expect(new Maybe(0).or(() => 1)).toBe(0);
    });
  });
});
