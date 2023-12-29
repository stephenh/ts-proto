/**
 * @jest-environment node
 */
import { TestService, TimestampMessage } from "./grpc-js-use-date-string-nano";

const jan1 = "1970-01-01T14:27:59.987654321Z";

describe("grpc-js-use-date-nano", () => {
  it("compiles", () => {
    expect(TestService).not.toBeUndefined();
  });

  it("returns simple date string", async () => {
    const encoded = TestService.simpleNow.requestSerialize(jan1);
    const decoded = TestService.simpleNow.responseDeserialize(encoded);
    expect(decoded).toStrictEqual(jan1);
  });

  it("returns wrapped date string", async () => {
    const data: TimestampMessage = { timestamp: jan1 };
    const encoded = TestService.wrappedNow.requestSerialize(data);
    const decoded = TestService.wrappedNow.responseDeserialize(encoded);
    expect(decoded).toStrictEqual(data);
  });
});
