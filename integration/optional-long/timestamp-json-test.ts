import Long = require("long");
import { Timestamp } from "./google/protobuf/timestamp";

describe("Timestamp JSON with useOptionals=all and forceLong=long", () => {
  it("encodes and decodes an RFC 3339 string", () => {
    const timestamp: Timestamp = { seconds: Long.fromNumber(123456789), nanos: 234567890 };
    expect(Timestamp.toJSON(timestamp)).toBe("1973-11-29T21:33:09.234567890Z");
    expect(Timestamp.fromJSON("1973-11-29T21:33:09.234567890Z")).toEqual(timestamp);
  });

  it("encodes unset fields as the epoch", () => {
    expect(Timestamp.toJSON({})).toBe("1970-01-01T00:00:00Z");
  });
});
