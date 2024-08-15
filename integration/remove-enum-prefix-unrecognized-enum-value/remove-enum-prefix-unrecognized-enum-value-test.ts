import {
  Foo,
  Bar,
  fooFromJSON,
  fooToJSON,
  barFromJSON,
  barToJSON,
  withNestedEnum_BazFromJSON,
  WithNestedEnum_Baz,
  withNestedEnum_BazToJSON,
  withNestedEnum_QuxFromJSON,
  withNestedEnum_QuxToJSON,
  WithNestedEnum_Qux,
} from "./remove-enum-prefix-unrecognized-enum-value";

function testEnumFromJSONAndToJSON<ENUM>(
  fromJSON: (s: string) => ENUM,
  toJSON: (e: ENUM) => string,
  valueMap: Record<string, ENUM>,
) {
  for (const [jsonValue, enumValue] of Object.entries(valueMap)) {
    expect(fromJSON(jsonValue)).toBe(enumValue);
    expect(toJSON(enumValue)).toBe(jsonValue);
  }
}

describe("remove-enum-prefix-unrecognized-enum-value", () => {
  it("encode and decode correctly", () => {
    testEnumFromJSONAndToJSON(fooFromJSON, fooToJSON, {
      FOO_UNSPECIFIED: Foo.UNSPECIFIED,
      FOO_BAR: Foo.BAR,
      UNKNOWN: Foo.UNSPECIFIED,
    });
    testEnumFromJSONAndToJSON(barFromJSON, barToJSON, {
      BAR_UNSPECIFIED: Bar.UNSPECIFIED,
      BAZ: Bar.BAZ,
      UNKNOWN: Bar.UNSPECIFIED,
    });
    testEnumFromJSONAndToJSON(withNestedEnum_BazFromJSON, withNestedEnum_BazToJSON, {
      BAZ_UNSPECIFIED: WithNestedEnum_Baz.UNSPECIFIED,
      BAZ_ONE: WithNestedEnum_Baz.ONE,
      UNKNOWN: WithNestedEnum_Baz.UNSPECIFIED,
    });
    testEnumFromJSONAndToJSON(withNestedEnum_QuxFromJSON, withNestedEnum_QuxToJSON, {
      QUX_UNSPECIFIED: WithNestedEnum_Qux.UNSPECIFIED,
      ONE: WithNestedEnum_Qux.ONE,
      UNKNOWN: WithNestedEnum_Qux.UNSPECIFIED,
    });
  });
});
