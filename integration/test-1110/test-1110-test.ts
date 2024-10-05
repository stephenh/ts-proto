import { UserRule } from "./test-1110";

describe("test-1110", () => {
  it("Able to create a partial user rule with reserved word messages", () => {
    const simple: UserRule = UserRule.fromPartial({ UUID: "foo" });
    expect(simple).toBeTruthy();
  });
});
