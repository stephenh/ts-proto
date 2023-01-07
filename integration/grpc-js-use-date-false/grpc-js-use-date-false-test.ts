/**
 * @jest-environment node
 */
import { Timestamp } from "./google/protobuf/timestamp";
import { TestService, TimestampMessage } from "./grpc-js-use-date-false";

describe("grpc-js-use-date-true", () => {
  it("compiles", () => {
    expect(TestService).not.toBeUndefined();
  });

  it("returns simple timestamp object", async () => {
    const data: Timestamp = {
      seconds: 1,
      nanos: 2,
    };
    const encoded = TestService.simpleNow.requestSerialize(data);
    const decoded = TestService.simpleNow.responseDeserialize(encoded);
    expect(decoded).toStrictEqual(data);
  });

  it("returns wrapped timestamp object", async () => {
    const data: TimestampMessage = {
      timestamp: {
        seconds: 1,
        nanos: 2,
      },
    };
    const encoded = TestService.wrappedNow.requestSerialize(data);
    const decoded = TestService.wrappedNow.responseDeserialize(encoded);
    expect(decoded).toStrictEqual(data);
  });
});
