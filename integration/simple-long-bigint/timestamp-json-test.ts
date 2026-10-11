import { Timestamp } from "./google/protobuf/timestamp";

describe("Timestamp JSON with forceLong=bigint", () => {
  it("encodes and decodes an RFC 3339 string", () => {
    const timestamp: Timestamp = { seconds: BigInt(123456789), nanos: 1 };
    expect(Timestamp.toJSON(timestamp)).toBe("1973-11-29T21:33:09.000000001Z");
    expect(Timestamp.fromJSON("1973-11-29T21:33:09.000000001Z")).toEqual(timestamp);
  });
});
