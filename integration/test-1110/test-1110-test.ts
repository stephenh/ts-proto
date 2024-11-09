import { UserRule, Nested_Function } from "./test-1110";

describe("test-1110", () => {
  it("Able to create a partial user rule with reserved word messages", () => {
    const simple: UserRule = UserRule.fromPartial({ UUID: "foo" });
    expect(simple).toBeTruthy();
  });

  it("built in handling should only be done to top level", () => {
    const nestedFunction: Nested_Function = Nested_Function.fromPartial({});
    expect(nestedFunction).toBeTruthy();
  });
});
