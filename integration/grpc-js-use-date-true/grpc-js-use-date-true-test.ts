/**
 * @jest-environment node
 */
import { TestService, TimestampMessage } from "./grpc-js-use-date-true";

const jan1 = new Date("1970-01-01T00:00:00.000Z");

describe("grpc-js-use-date-true", () => {
  it("compiles", () => {
    expect(TestService).not.toBeUndefined();
  });

  it("returns simple date object", async () => {
    const encoded = TestService.simpleNow.requestSerialize(jan1);
    const decoded = TestService.simpleNow.responseDeserialize(encoded);
    expect(decoded).toStrictEqual(jan1);
  });

  it("returns wrapped date object", async () => {
    const data: TimestampMessage = { timestamp: jan1 };
    const encoded = TestService.wrappedNow.requestSerialize(data);
    const decoded = TestService.wrappedNow.responseDeserialize(encoded);
    expect(decoded).toStrictEqual(data);
  });
});
