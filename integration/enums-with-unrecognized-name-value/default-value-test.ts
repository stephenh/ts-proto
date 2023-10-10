import { stateEnumFromJSON, stateEnumToJSON, stateEnumToNumber, StateEnum } from "./test";

describe("enums-with-unrecognized-name-value", () => {
  describe("stateEnumFromJSON", () => {
    it("returns correct default state", () => {
      expect(stateEnumFromJSON("non-existent")).toBe(StateEnum.UNKNOWN_STATE);
    });
  });

  describe("stateEnumToJSON", () => {
    it("returns correct default state", () => {
      // @ts-expect-error Argument of type '1' is not assignable to parameter of type 'StateEnum'.
      expect(stateEnumToJSON(1)).toBe("UNKNOWN_STATE");
    });
  });

  describe("stateEnumToNumber", () => {
    it("returns correct default state", () => {
      // @ts-expect-error Argument of type '1' is not assignable to parameter of type 'StateEnum'.
      expect(stateEnumToNumber(1)).toBe(0);
    });
  });
});
