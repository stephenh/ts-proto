import { Metadata } from "./metadata";
import { Timestamp } from "./google/protobuf/timestamp";

const nov29: Timestamp = { seconds: 123456789, nanos: 234567890 };

describe("useDate=false", () => {
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
        "lastEdited": "1973-11-29T21:33:09.234Z",
      }
    `);
    expect(Metadata.fromJSON(json).lastEdited).toMatchInlineSnapshot(`
      {
        "nanos": 234000000,
        "seconds": 123456789,
      }
    `);
  });

  it("keeps sub-millisecond precision when decoding json", () => {
    expect(Metadata.fromJSON({ lastEdited: "2026-05-29T08:35:13.700719321Z" }).lastEdited).toEqual({
      seconds: 1780043713,
      nanos: 700719321,
    });
    expect(Metadata.fromJSON({ lastEdited: "2026-05-29T08:35:13.700719Z" }).lastEdited).toEqual({
      seconds: 1780043713,
      nanos: 700719000,
    });
    expect(Metadata.fromJSON({ lastEdited: "2026-05-29T10:35:13.700719321+02:00" }).lastEdited).toEqual({
      seconds: 1780043713,
      nanos: 700719321,
    });
    expect(Metadata.fromJSON({ lastEdited: "2026-05-29T08:35:13.9999999999Z" }).lastEdited).toEqual({
      seconds: 1780043713,
      nanos: 999999999,
    });
  });
});
