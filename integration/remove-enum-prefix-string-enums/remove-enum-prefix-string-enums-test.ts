import {
  Foo,
  Bar,
  fooFromJSON,
  fooToJSON,
  barFromJSON,
  barToJSON,
  WithNestedEnum_Baz,
  WithNestedEnum_Qux,
  withNestedEnum_BazFromJSON,
  withNestedEnum_BazToJSON,
  withNestedEnum_QuxFromJSON,
  withNestedEnum_QuxToJSON,
} from "./remove-enum-prefix-string-enums";

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

describe("remove-enum-prefix-string-enums", () => {
  it("encode and decode correctly", () => {
    testEnumFromJSONAndToJSON(fooFromJSON, fooToJSON, {
      FOO_UNSPECIFIED: Foo.UNSPECIFIED,
      FOO_BAR: Foo.BAR,
    });
    testEnumFromJSONAndToJSON(barFromJSON, barToJSON, {
      BAR_UNSPECIFIED: Bar.UNSPECIFIED,
      BAZ: Bar.BAZ,
    });
    testEnumFromJSONAndToJSON(withNestedEnum_BazFromJSON, withNestedEnum_BazToJSON, {
      BAZ_UNSPECIFIED: WithNestedEnum_Baz.UNSPECIFIED,
      BAZ_ONE: WithNestedEnum_Baz.ONE,
    });
    testEnumFromJSONAndToJSON(withNestedEnum_QuxFromJSON, withNestedEnum_QuxToJSON, {
      QUX_UNSPECIFIED: WithNestedEnum_Qux.UNSPECIFIED,
      ONE: WithNestedEnum_Qux.ONE,
    });
  });
});
