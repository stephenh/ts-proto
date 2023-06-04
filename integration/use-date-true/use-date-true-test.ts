import { Todo, Clock } from "./use-date-true";
import { Timestamp } from "./google/protobuf/timestamp";
const jan1 = new Date("1970-01-01T00:00:00.000Z");
const feb1 = new Date("1970-02-01T00:00:00.000Z");

describe("useDate=true", () => {
  it("generates a services that compiles", () => {
    let c: Clock = {
      Now: () => Promise.resolve(Timestamp.fromPartial({})),
    };
  });
  it("generates types that compile and encode", () => {
    const output = Todo.encode({
      id: "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
      timestamp: feb1,
      repeatedTimestamp: [jan1, feb1],
      mapOfTimestamps: {
        jan1,
        feb1,
      },
    }).finish();

    expect(Todo.decode(output)).toMatchInlineSnapshot(`
      {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfTimestamps": {
          "feb1": 1970-02-01T00:00:00.000Z,
          "jan1": 1970-01-01T00:00:00.000Z,
        },
        "optionalTimestamp": undefined,
        "repeatedTimestamp": [
          1970-01-01T00:00:00.000Z,
          1970-02-01T00:00:00.000Z,
        ],
        "timestamp": 1970-02-01T00:00:00.000Z,
      }
    `);

    expect(Todo.toJSON(Todo.decode(output))).toMatchInlineSnapshot(`
      {
        "id": "6883ed6e-bd0d-4817-ba58-c2a53c73edc2",
        "mapOfTimestamps": {
          "feb1": "1970-02-01T00:00:00.000Z",
          "jan1": "1970-01-01T00:00:00.000Z",
        },
        "repeatedTimestamp": [
          "1970-01-01T00:00:00.000Z",
          "1970-02-01T00:00:00.000Z",
        ],
        "timestamp": "1970-02-01T00:00:00.000Z",
      }
    `);
  });
});
