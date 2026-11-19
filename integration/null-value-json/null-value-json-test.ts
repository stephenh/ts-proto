import { NullValueMessage } from "./null-value-json";
import { NullValue, nullValueFromJSON, nullValueToJSON } from "./google/protobuf/struct";

describe("null-value-json", () => {
  it("converts NullValue to and from null", () => {
    expect(nullValueToJSON(NullValue.NULL_VALUE)).toBeNull();
    expect(nullValueFromJSON(null)).toBe(NullValue.NULL_VALUE);
    // The value's name and number are still accepted
    expect(nullValueFromJSON("NULL_VALUE")).toBe(NullValue.NULL_VALUE);
    expect(nullValueFromJSON(0)).toBe(NullValue.NULL_VALUE);
  });

  it("writes NullValue fields as null in toJSON", () => {
    const message = NullValueMessage.fromPartial({
      optionalNullValue: NullValue.NULL_VALUE,
      repeatedNullValue: [NullValue.NULL_VALUE, NullValue.NULL_VALUE],
      mapNullValue: { a: NullValue.NULL_VALUE },
      oneofNullValue: NullValue.NULL_VALUE,
    });
    expect(NullValueMessage.toJSON(message)).toEqual({
      optionalNullValue: null,
      repeatedNullValue: [null, null],
      mapNullValue: { a: null },
      oneofNullValue: null,
    });
  });

  it("reads null as a set NullValue in fromJSON", () => {
    const message = NullValueMessage.fromJSON({
      nullValue: null,
      optionalNullValue: null,
      repeatedNullValue: [null, null],
      mapNullValue: { a: null },
      oneofNullValue: null,
    });
    expect(message).toEqual({
      nullValue: NullValue.NULL_VALUE,
      optionalNullValue: NullValue.NULL_VALUE,
      repeatedNullValue: [NullValue.NULL_VALUE, NullValue.NULL_VALUE],
      mapNullValue: { a: NullValue.NULL_VALUE },
      oneofNullValue: NullValue.NULL_VALUE,
      oneofString: undefined,
    });
  });

  it("leaves absent NullValue fields unset in fromJSON", () => {
    expect(NullValueMessage.fromJSON({ oneofString: "a" })).toEqual({
      nullValue: NullValue.NULL_VALUE,
      optionalNullValue: undefined,
      repeatedNullValue: [],
      mapNullValue: {},
      oneofNullValue: undefined,
      oneofString: "a",
    });
  });

  it("round-trips through JSON", () => {
    const json = {
      optionalNullValue: null,
      repeatedNullValue: [null],
      mapNullValue: { a: null, b: null },
      oneofNullValue: null,
    };
    const message = NullValueMessage.fromJSON(JSON.parse(JSON.stringify(json)));
    expect(JSON.parse(JSON.stringify(NullValueMessage.toJSON(message)))).toEqual(json);
  });
});
