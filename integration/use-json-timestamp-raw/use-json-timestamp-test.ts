import { Metadata } from "./metadata";
import { Timestamp } from "./google/protobuf/timestamp";

const nov29: Timestamp = { seconds: 123456789, nanos: 234567890 };

describe("useJsonTimestamp=raw", () => {
  it("can encode/decode binary", () => {
    const output = Metadata.encode({ lastEdited: nov29 }).finish();
    expect(output.length).toBeGreaterThan(8);
    expect(Metadata.decode(output).lastEdited).toMatchInlineSnapshot(`
      {
        "nanos": 234567890,
        "seconds": 123456789,
      }
    `);
  });

  it("can encode/decode json", () => {
    const json = Metadata.toJSON({ lastEdited: nov29 });
    expect(json).toMatchInlineSnapshot(`
      {
        "lastEdited": {
          "nanos": 234567890,
          "seconds": 123456789,
        },
      }
    `);
    expect(Metadata.fromJSON(json).lastEdited).toMatchInlineSnapshot(`
      {
        "nanos": 234567890,
        "seconds": 123456789,
      }
    `);
  });

  it("doesn't lose precision in encoding/decoding", () => {
    const d = Metadata.fromJSON(Metadata.toJSON({ lastEdited: nov29 }));
    expect(d.lastEdited?.seconds).toStrictEqual(nov29.seconds);
    expect(d.lastEdited?.nanos).toStrictEqual(nov29.nanos);
  });
});
