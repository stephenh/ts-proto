import { Timestamp } from "./google/protobuf/timestamp";

describe("Timestamp JSON with forceLong=string", () => {
  it("encodes and decodes an RFC 3339 string", () => {
    const timestamp: Timestamp = { seconds: "123456789", nanos: 234567890 };
    expect(Timestamp.toJSON(timestamp)).toBe("1973-11-29T21:33:09.234567890Z");
    expect(Timestamp.fromJSON("1973-11-29T21:33:09.234567890Z")).toEqual(timestamp);
  });
});
