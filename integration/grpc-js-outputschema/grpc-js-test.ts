/**
 * @jest-environment node
 */
import { TestService } from "./simple";

describe("grpc-js-test", () => {
  it("compiles", () => {
    expect(TestService).not.toBeUndefined();
  });
});
